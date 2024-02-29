package net.tv.weather.util;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import net.datahub.tv.common.service.TvCommonService;
import net.tv.weather.model.WeatherApiResponseModel;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;
import net.tv.weather.service.WeatherService;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


import javax.inject.Inject;
import java.lang.reflect.Type;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
@Slf4j
public class WeatherComponent {

    @Inject
    private WeatherService weatherService;

    @Inject
    private TvCommonService tvCommonService;

    @Autowired
    private static final RestTemplate restTemplate = restTemplateConfig();

    @Value("${AppConf.weather.apiUrl}")
    public String weatherApiUrl;

    @Value("${AppConf.weather.apiKey}")
    public String weatherApiKey;

    @Value("#{'${AppConf.weather.rainCode}'.split(',')}")
    private List rainCodeList;

    @Value("#{'${AppConf.weather.snowCode}'.split(',')}")
    private List<String> snowCodeList;

    @Value("#{'${AppConf.weather.mildCode}'.split(',')}")
    private List<String> mildCodeList;

    @Value("#{'${AppConf.weather.cloudCode}'.split(',')}")
    private List<String> cloudCodeList;

    public Gson gson = new Gson();

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

    @Scheduled(cron = "0 0 10 * * *")
    public void insertWeatherHistory() throws ParseException {

        List<WeatherModel> weatherStationNoList = weatherService.selectWeatherStationNo();
        final HttpEntity entity = new HttpEntity(new HttpHeaders());
        Type listType = new TypeToken<ArrayList<WeatherApiResponseModel>>() {}.getType();
        Calendar calendar = Calendar.getInstance();
        calendar.add(calendar.DATE, -1); //날짜를 하루 뺀다.

        // API에서 전날 데이터까지 제공
        String endDt   = dateFormat.format(calendar.getTime());
        String apiUrl = weatherApiUrl + "&serviceKey=" + weatherApiKey + "&endDt=" + endDt;

        //관측소 별 반복문
        for(int i = 0; i < weatherStationNoList.size(); i ++) {
            String startDt = weatherStationNoList.get(i).getMeteringDate();
            Date startDate = dateFormat.parse(startDt);
            calendar.setTime(startDate);
            calendar.add(calendar.DATE, 1);

            String fullUrl = apiUrl + "&stnIds=" + weatherStationNoList.get(i).getWeatherStationNo() + "&startDt=" + dateFormat.format(calendar.getTime());

            int pageNo = 1;
            boolean lastPage = false;
            int retryCount = 0;
            while(!lastPage && retryCount < 5) {
                try {
                    URI weatherApiURI = new URI(fullUrl + "&pageNo=" + pageNo);
                    ResponseEntity<String> weatherApiResponse = restTemplate.exchange(weatherApiURI, HttpMethod.GET, entity, String.class);
                    if (weatherApiResponse.getStatusCode().equals(HttpStatus.OK)) {

                        String response = weatherApiResponse.getBody();
                        JsonObject jsonObject = gson.fromJson(response, JsonObject.class);
                        jsonObject = jsonObject.getAsJsonObject("response");
                        jsonObject = jsonObject.getAsJsonObject("body");
                        int totalCount = Integer.parseInt(String.valueOf(jsonObject.get("totalCount")));
                        jsonObject = jsonObject.getAsJsonObject("items");
                        List<WeatherApiResponseModel> apiResultBody = gson.fromJson(jsonObject.get("item").toString(), listType);

                        List<WeatherModel> insertList = new ArrayList<>();
                        for (int j = 0; j < apiResultBody.size(); j++) {
                            WeatherModel weatherModel = new WeatherModel();
                            weatherModel.setWeatherStationNo(weatherStationNoList.get(i).getWeatherStationNo());
                            weatherModel.setMeteringDate(apiResultBody.get(j).getTm().substring(0, 10).replaceAll("-", ""));
                            weatherModel.setMeteringHour(apiResultBody.get(j).getTm().substring(11, 13));

                            if(apiResultBody.get(j).getTa().equals("")) weatherModel.setTemperature("-999");
                            else weatherModel.setTemperature(apiResultBody.get(j).getTa());
                            if(apiResultBody.get(j).getTa().equals("")) weatherModel.setWindSpeed("-999");
                            else weatherModel.setWindSpeed(apiResultBody.get(j).getWs());
                            if(apiResultBody.get(j).getTa().equals("")) weatherModel.setWindType("-99");
                            else weatherModel.setWindType(apiResultBody.get(j).getWd());
                            // 강수량 있음
                            if (!apiResultBody.get(j).getRn().equals("") && Double.parseDouble(apiResultBody.get(j).getRn()) != 0.0) {
                                if (apiResultBody.get(j).getDmstMtphNo().length() / 2 == 0 && apiResultBody.get(j).getDmstMtphNo().length() != 0) {
                                    if (snowCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                        weatherModel.setWeatherType("4");
                                    else if (rainCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                        weatherModel.setWeatherType("3");
                                } else weatherModel.setWeatherType("3");
                            } else {// 강수량 없음
                                // 결측 및 오류 아님
                                if (apiResultBody.get(j).getRnQcflg().equals("")) {
                                    try {
                                        //맑음
                                        if (Double.parseDouble(apiResultBody.get(j).getDc10Tca()) <= 5.4)
                                            weatherModel.setWeatherType("1");
                                            //흐림
                                        else weatherModel.setWeatherType("2");
                                    } catch (NumberFormatException ne) {
                                        weatherModel.setWeatherType("8");
                                    }
                                } else {
                                    try {
                                        if (apiResultBody.get(j).getDmstMtphNo().equals("")) {
                                            //맑음
                                            if (Double.parseDouble(apiResultBody.get(j).getDc10Tca()) <= 5.4)
                                                weatherModel.setWeatherType("1");
                                                //흐림
                                            else weatherModel.setWeatherType("2");
                                        } else {
                                            if (apiResultBody.get(j).getDmstMtphNo().length() % 2 == 0) {
                                                if (snowCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                                    weatherModel.setWeatherType("4");
                                                else if (rainCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                                    weatherModel.setWeatherType("3");
                                                else if (cloudCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                                    weatherModel.setWeatherType("2");
                                                else if (mildCodeList.contains(apiResultBody.get(j).getDmstMtphNo().substring(0, 2)))
                                                    weatherModel.setWeatherType("1");
                                                else {
                                                    //맑음
                                                    if (Double.parseDouble(apiResultBody.get(j).getDc10Tca()) <= 5.4)
                                                        weatherModel.setWeatherType("1");
                                                        //흐림
                                                    else weatherModel.setWeatherType("2");
                                                }
                                            }
                                        }
                                    } catch (NumberFormatException ne) {
                                        weatherModel.setWeatherType("7");
                                    }
                                }
                            }
                            insertList.add(weatherModel);
                        }
                        weatherService.insertWeatherHistory(insertList);
                        if ((24 * pageNo) >= totalCount) lastPage = true;
                        pageNo++;
                        Thread.sleep(1000);
                    } else {
                        retryCount ++;
                    }
                } catch (JsonSyntaxException jse) {
                    retryCount ++;
                    StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
                    log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
                    log.error(jse.getMessage());
                } catch (Exception e) {
                    retryCount ++;
                    StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
                    log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
                    log.error(e.getMessage());
                    break;
                }
            }
        }
    }

    @Scheduled(cron = "0 0 11 * * *")
    public void insertWeatherSummary() throws ParseException {

        List<WeatherSummaryModel> cellList = tvCommonService.getCellLocationInformation();
        List<WeatherModel> weatherStationNoList = weatherService.selectWeatherStationNo();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(calendar.MONTH, -12);

        //기본 월 세팅 (전달 ~ 이번달 summary) 원하는 날짜 특정시 원하는 날짜를 yyyymm01 형식으로 하드코딩 하면 됨.
        String basicStartDt = dateFormat.format(calendar.getTime()).substring(0, 6) + "01";

        calendar.setTime(new Date());
        calendar.add(calendar.MONTH, 1);

        //Summary 생성하는 최대 월(현재 월)
        String limitMonth = dateFormat.format(calendar.getTime()).substring(0, 6);

        for(int i = 0; i < weatherStationNoList.size(); i ++ ) {

            Map<String, Object> parameter = new HashMap<>();
            parameter.put("cellList", cellList);
            parameter.put("weatherStationNo", weatherStationNoList.get(i).getWeatherStationNo());
            parameter.put("startDate", "");
            parameter.put("endDate", "");

            String startDt = basicStartDt;

            while(true) {
                if(startDt.substring(0, 6).equals(limitMonth)) break;

                parameter.replace("startDate", startDt);

                Date startDate = dateFormat.parse(startDt);
                calendar.setTime(startDate);
                calendar.add(calendar.MONTH, 1);

                String endDt = dateFormat.format(calendar.getTime());
                parameter.replace("endDate", endDt);
                weatherService.insertWeatherSummaryCount(parameter);
                startDt = endDt;
            }
        }

    }

    public static RestTemplate restTemplateConfig(){

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        HttpClient client = HttpClientBuilder.create()
                //최대 오픈되는 연결 수
                .setMaxConnTotal(10)
                // IP, 포트 번호 1쌍에 가능한 연결 수
                .setMaxConnPerRoute(10)
                .build();

        factory.setHttpClient(client);

        //Connection timeout
        factory.setConnectTimeout(90000);
        //Read timeout
        factory.setReadTimeout(90000);
        RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(factory));

        return restTemplate;
    }
}
