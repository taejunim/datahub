package net.pm.service.impl;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.dto.PmAcdntRcptInfoRequestDto;
import net.pm.dto.PmAcdntRcptInfoGraphResponseDto;
import net.pm.mapper.PmAcdntRcptInfoMapper;
import net.pm.model.PmAcdntRcptInfo;
import net.pm.service.PmAcdntRcptInfoService;
import net.pm.util.chart.BarChartData;
import net.pm.util.chart.LineChartData;
import net.pm.util.chart.PieChartData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class PmAcdntRcptInfoServiceImpl extends BaseServiceImpl<PmAcdntRcptInfo, PmAcdntRcptInfoRequestDto, PmAcdntRcptInfoMapper> implements PmAcdntRcptInfoService {

    @Resource(name="pmAcdntRcptInfoMapper")
    private PmAcdntRcptInfoMapper pmAcdntRcptInfoMapper;

    @Override
    @Resource(name="pmAcdntRcptInfoMapper")
    protected void setMapper (PmAcdntRcptInfoMapper mapper) {
        super.setMapper(mapper);
    }

    @Override
    public int countPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto) {
        return pmAcdntRcptInfoMapper.countPmAcdntRcptInfoListByFilter(pmAcdntRcptInfoRequestDto);
    }

    @Override
    public List<PmAcdntRcptInfo> selectPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto) {
        return pmAcdntRcptInfoMapper.selectPmAcdntRcptInfoListByFilter(pmAcdntRcptInfoRequestDto);
    }

    @Override
    public PmAcdntRcptInfoGraphResponseDto getOverallPmAcdntRcptInfoStat(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto) {
        List<PieChartData> typeStat = new ArrayList<>();
        List<PieChartData> operatorStat = new ArrayList<>();
        List<PieChartData> kindStat = new ArrayList<>();
        List<PieChartData> ageStat = new ArrayList<>();
        List<PieChartData> genderStat = new ArrayList<>();
        List<PieChartData> spotPieStat = new ArrayList<>();
        List<BarChartData> spotBarStat = new ArrayList<>();
        List<LineChartData> timeStat = new ArrayList<>();
        List<BarChartData> dowStat = new ArrayList<>();

        List<PmAcdntRcptInfo> pmAcdntRcptInfoList = pmAcdntRcptInfoMapper.selectGraphPmAcdntRcptInfoListByFilter(pmAcdntRcptInfoRequestDto);

        // 유형별
        Map<String, Long> typeMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            if (pmAcdntRcptInfo.getAcdnt_type() == null || pmAcdntRcptInfo.getAcdnt_type().equals("") || pmAcdntRcptInfo.getAcdnt_type().equals("-")) {
                pmAcdntRcptInfo.setAcdnt_type("미분류");
            }

            return pmAcdntRcptInfo;
        }).collect(
                Collectors.groupingBy(PmAcdntRcptInfo::getAcdnt_type, Collectors.counting()));

        typeMap.entrySet().stream().forEach(entry->{
            typeStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // 운영사별
        Map<String, Long> operatorMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            if (pmAcdntRcptInfo.getOper_co() == null || pmAcdntRcptInfo.getOper_co().equals("") || pmAcdntRcptInfo.getOper_co().equals("-")) {
                pmAcdntRcptInfo.setOper_co("미분류");
            }

            return pmAcdntRcptInfo;
        }).collect(
                Collectors.groupingBy(PmAcdntRcptInfo::getOper_co, Collectors.counting()));

        operatorMap.entrySet().stream().forEach(entry->{
            operatorStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // PM 종류별
        Map<String, Long> kindMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            if (pmAcdntRcptInfo.getPm_type()==null || pmAcdntRcptInfo.getPm_type().equals("") || pmAcdntRcptInfo.getPm_type().equals("-")) {
                pmAcdntRcptInfo.setPm_type("미분류");
            }

            return pmAcdntRcptInfo;
        }).collect(
                Collectors.groupingBy(PmAcdntRcptInfo::getPm_type, Collectors.counting()));

        kindMap.entrySet().stream().forEach(entry->{
            kindStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // 연령별
        Map<String, Long> ageMap = pmAcdntRcptInfoList.stream().filter(pmAcdntRcptInfo-> {
            if (pmAcdntRcptInfo.getAge() != null && !pmAcdntRcptInfo.getAge().equals("") && !pmAcdntRcptInfo.getAge().equals("-")) {
                int age = Integer.parseInt(pmAcdntRcptInfo.getAge());

                if (age < 0) {
                    return false;
                } else {
                    return true;
                }
            }

            return true;
        }).map(pmAcdntRcptInfo ->{
            if (pmAcdntRcptInfo.getAge() != null && !pmAcdntRcptInfo.getAge().equals("") && !pmAcdntRcptInfo.getAge().equals("-")) {
                int age = Integer.parseInt(pmAcdntRcptInfo.getAge());

                int ageGroup = age / 10 * 10;

                if (ageGroup == 0) {
                    return "10대 미만";
                } else if (ageGroup == 10) {
                    return "10대";
                } else if (ageGroup == 20) {
                    return "20대";
                } else if (ageGroup == 30) {
                    return "30대";
                } else if (ageGroup == 40) {
                    return "40대";
                } else {
                    return "50대 이상";
                }
            } else {
                return "미분류";
            }
        }).collect(Collectors.groupingBy(s->s, Collectors.counting()));

        ageMap.entrySet().stream().forEach(entry->{
            ageStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // 성별
        Map<String, Long> genderMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            if (pmAcdntRcptInfo.getSexd() == null || pmAcdntRcptInfo.getSexd().equals("") || pmAcdntRcptInfo.getSexd().equals("-")) {
                pmAcdntRcptInfo.setSexd("미분류");
            }

            return pmAcdntRcptInfo;
        }).collect(
                Collectors.groupingBy(PmAcdntRcptInfo::getSexd, Collectors.counting()));

        genderMap.entrySet().stream().forEach(entry->{
            genderStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // 지역별 데이터 추출
        Map<String, Long> spotMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            if (pmAcdntRcptInfo.getAcdnt_spot() == null || pmAcdntRcptInfo.getAcdnt_spot().equals("") || pmAcdntRcptInfo.getAcdnt_spot().equals("-")) {
                pmAcdntRcptInfo.setAcdnt_spot("미분류");
            }
            return pmAcdntRcptInfo;
        }).collect(
                Collectors.groupingBy(PmAcdntRcptInfo::getAcdnt_spot, Collectors.counting()));

        spotMap.entrySet().stream().forEach(entry->{
            spotBarStat.add(BarChartData.builder()
                    .name(entry.getKey())
                    .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                    .build());
            spotPieStat.add(PieChartData.builder()
                    .name(entry.getKey())
                    .value1(0)
                    .value2(0)
                    .value(Integer.valueOf(entry.getValue().intValue()))
                    .build());
        });

        // 시간대별 데이터 추출
        DecimalFormat decimalFormat = new DecimalFormat("00");

        Map<Integer, Long> accTimeMap = pmAcdntRcptInfoList.stream().filter(pmAcdntRcptInfo -> pmAcdntRcptInfo.getAcdnt_ocrn_dt() != null).map(pmAcdntRcptInfo ->{
            LocalDateTime localDateTime = pmAcdntRcptInfo.getAcdnt_ocrn_dt().toLocalDateTime();
            return localDateTime.getYear();
        }).collect(
                Collectors.groupingBy(hour->hour, Collectors.counting()));

        accTimeMap.entrySet().stream().forEach(entry->{
            timeStat.add(LineChartData.builder()
                    .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                    .x(String.valueOf(entry.getKey()))
                    .build());
        });

        int startYear = pmAcdntRcptInfoRequestDto.getStartSearchDt().toLocalDateTime().getYear();
        int endYear = LocalDateTime.now().getYear();

        timeStat.addAll(IntStream.rangeClosed(startYear, endYear)
                .filter(i->!accTimeMap.containsKey(i))
                .mapToObj(i -> LineChartData.builder()
                        .totalCnt(0)
                        .x(decimalFormat.format(i))
                        .build())
                .collect(Collectors.toList()));

        // 요일별 데이터 추출
        Map<Integer, String> dowConvertMap = new HashMap<Integer, String>() {{
            put(1, "월요일");
            put(2, "화요일");
            put(3, "수요일");
            put(4, "목요일");
            put(5, "금요일");
            put(6, "토요일");
            put(7, "일요일");
        }};

        Map<Integer, Long> accDowMap = pmAcdntRcptInfoList.stream().map(pmAcdntRcptInfo -> {
            LocalDateTime accTime = pmAcdntRcptInfo.getAcdnt_ocrn_dt().toLocalDateTime();
            DayOfWeek accDayOfWeek = accTime.getDayOfWeek();

            return accDayOfWeek;
        }).collect(Collectors.groupingBy(DayOfWeek::getValue, Collectors.counting()));

        dowStat.addAll(IntStream.rangeClosed(1, 6)
                 .mapToObj(i->BarChartData.builder()
                         .name(dowConvertMap.get(i))
                         .totalCnt(accDowMap.containsKey(i) ? Integer.valueOf(accDowMap.get(i).intValue()) : 0)
                         .build())
                .collect(Collectors.toList()));

        if (accDowMap.containsKey(7)) {
            dowStat.add(0, BarChartData.builder()
                    .name(dowConvertMap.get(7))
                    .totalCnt(Integer.valueOf(accDowMap.get(7).intValue()))
                    .build());
        } else {
            dowStat.add(0, BarChartData.builder()
                    .name(dowConvertMap.get(7))
                    .totalCnt(0)
                    .build());
        }

        Collections.sort(spotBarStat, Collections.reverseOrder());
        Collections.sort(spotPieStat, Collections.reverseOrder());
        Collections.sort(timeStat);

        return PmAcdntRcptInfoGraphResponseDto.builder()
                                .timeLineChartName("사고건수")
                                .typeStat(typeStat)
                                .operatorStat(operatorStat)
                                .kindStat(kindStat)
                                .ageStat(ageStat)
                                .genderStat(genderStat)
                                .spotPieStat(spotPieStat.size() >= 5 ?
                                        spotPieStat.subList(0, 5) : spotPieStat)
                                .spotBarStat(spotBarStat)
                                .timeStat(timeStat)
                                .dowStat(dowStat)
                                .build();
    }
    private static boolean isValidDateFormat(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);  // 엄격한 형식 검사

        try {
            dateFormat.parse(dateString);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }
}
