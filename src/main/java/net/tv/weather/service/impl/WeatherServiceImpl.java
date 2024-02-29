package net.tv.weather.service.impl;

import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.weather.mapper.WeatherMapper;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;
import net.tv.weather.service.WeatherService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * packageName    : net.tv.weather.service.impl
 * fileName       : WeatherServiceImpl
 * author         : joyouyeong
 * date           : 2023/10/17
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/10/17       joyouyeong       최초 생성
 */

@Service
public class WeatherServiceImpl implements WeatherService {

    @Resource(name="weatherMapper")
    private WeatherMapper weatherMapper;

    @Override
    public List<WeatherModel> selectWeatherStationNo() {
        return weatherMapper.selectWeatherStationNo();
    }

    @Override
    public Map<String, Object> getWeatherChartData(Map<String, Object> parameter) {
        Map<String, Object> result = new HashMap<>();
        result.put("barChartDataByCarWeather", weatherMapper.getBarChartDataByCarWeather(parameter));
        result.put("pieChartDataByCarWeather", weatherMapper.getPieChartDataByCarWeather(parameter));
        result.put("getDataByWeatherYearMonthDay", weatherMapper.getDataByWeatherYearMonthDay(parameter));

        if(parameter.get("period").equals("day")) {
            result.put("barChartDataByPopulationWeather", weatherMapper.getBarChartDataByPopulationWeatherDay(parameter));
            result.put("pieChartDataByPopulationWeather", weatherMapper.getPieChartDataByPopulationWeatherDay(parameter));
        } else {
            result.put("barChartDataByPopulationWeather", weatherMapper.getBarChartDataByPopulationWeatherMonthYear(parameter));
            result.put("pieChartDataByPopulationWeather", weatherMapper.getPieChartDataByPopulationWeatherMonthYear(parameter));
        }

        return result;
    }



    @Override
    public int insertWeatherHistory(List<WeatherModel> list) {
        return weatherMapper.insertWeatherHistory(list);
    }

    @Override
    public int insertWeatherSummaryCount(Map<String, Object> parameter) { return  weatherMapper.insertWeatherSummaryCount(parameter); }
}
