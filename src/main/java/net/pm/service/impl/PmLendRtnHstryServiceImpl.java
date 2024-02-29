package net.pm.service.impl;

import net.pm.dto.PmLendRtnHstryGraphResponseDto;
import net.pm.dto.PmLendRtnHstryRequestDto;
import net.pm.dto.PmLendRtnHstryTimeBasedUsageResponseDto;
import net.pm.mapper.PmLendRtnHstryMapper;
import net.pm.model.PmLendRtnHstry;
import net.pm.service.PmLendRtnHstryService;
import net.pm.util.chart.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service("pmLendRtnHstryService")
public class PmLendRtnHstryServiceImpl implements PmLendRtnHstryService {

    @Resource (name="pmLendRtnHstryMapper")
    private PmLendRtnHstryMapper pmLendRtnHstryMapper;

    @Override
    public int countPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto) {
        return pmLendRtnHstryMapper.countPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);
    }

    @Override
    public List<PmLendRtnHstry> selectPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto) {
        return pmLendRtnHstryMapper.selectPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);
    }

    @Override
    public List<PmLendRtnHstry> selectPmLendRtnHstryList(PmLendRtnHstry pmLendRtnHstry) {
        return pmLendRtnHstryMapper.selectPmLendRtnHstryList(pmLendRtnHstry);
    }

    @Transactional
    @Override
    public void setParking() {
        // 불법주차 확인(순서대로 실행)
        pmLendRtnHstryMapper.updateFCFWParking(); // 소방시설
        pmLendRtnHstryMapper.updateBUSParking(); // 정류장
        pmLendRtnHstryMapper.updateSHBParking(); // 스마트허브
        pmLendRtnHstryMapper.updatePDCRParking(); // 횡단보도
        pmLendRtnHstryMapper.updateCROSParking(); // 교차로
    }

    private String hourConverter(int hour) {
        /*if (hour == 0) {
            return "12pm";
        }

        if (hour <= 12) {
            return hour + "am";
        } else {
            return (hour - 12) + "pm";
        }*/

        return hour + "시";
    }

    @Override
    public PmLendRtnHstryTimeBasedUsageResponseDto getPolygonInfo(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto) {
        List<PmLendRtnHstry> pmLendRtnHstryList = pmLendRtnHstryMapper.selectPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);

        // 시간대별 데이터 추출
        DecimalFormat decimalFormat = new DecimalFormat("00");

        Map<Integer, List<PmLendRtnHstry>> rentTimeMap = pmLendRtnHstryList.stream()
                .filter(pmLendRtnHstry -> pmLendRtnHstry.getLend_dt() != null)
                .collect(Collectors.groupingBy(pmLendRtnHstry -> {
                    LocalDateTime localDateTime = pmLendRtnHstry.getLend_dt().toLocalDateTime();
                    return localDateTime.getHour();
                }));

        return PmLendRtnHstryTimeBasedUsageResponseDto.builder()
                .rentTimeMap(rentTimeMap)
                .build();
    }

    @Override
    public PmLendRtnHstryGraphResponseDto getOverallPmLendRtnHstryStat(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto) {
        List<BarChartData> operatorStat = new ArrayList<>();
        List<PieChartData> spotPieStat = new ArrayList<>();
        List<BarChartData> spotBarStat = new ArrayList<>();
        List<LineChartData> timeStat = new ArrayList<>();
        List<BarChartData> kindStat = new ArrayList<>();
        List<BarChartData> dowStat = new ArrayList<>();
        List<BubbleHeatMapData> dowTimeStat = new ArrayList<>();

        List<PmLendRtnHstry> pmLendRtnHstryList = pmLendRtnHstryMapper.selectPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);

        // 운영사별 데이터 추출
        Map<String, List<PmLendRtnHstry>> operatorMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            if (pmLendRtnHstry.getOper() == null || pmLendRtnHstry.getOper().equals("") || pmLendRtnHstry.getOper().equals("-")) {
                pmLendRtnHstry.setOper("미분류");
            }

            return pmLendRtnHstry;
        }).collect(
                Collectors.groupingBy(PmLendRtnHstry::getOper));

        operatorMap.entrySet().stream().forEach(entry -> {
            AtomicInteger rentCnt = new AtomicInteger(0);
            AtomicInteger returnCnt = new AtomicInteger(0);

            List<PmLendRtnHstry> subList = entry.getValue();

            // 대여, 반납 개수 계산
            subList.stream().forEach(pmLendRtnHstry -> {
                if (!pmLendRtnHstryRequestDto.getRetf().equals("return") && pmLendRtnHstry.getLend_dt() != null && !pmLendRtnHstry.getLend_dt().equals("")) {
                    rentCnt.getAndAdd(1);
                }
                if (!pmLendRtnHstryRequestDto.getRetf().equals("rent") && pmLendRtnHstry.getRtn_dt() != null && !pmLendRtnHstry.getRtn_dt().equals("")) {
                    returnCnt.getAndAdd(1);
                }
            });

            if (pmLendRtnHstryRequestDto.getRetf().equals("rent")) {
                operatorStat.add(BarChartData.builder()
                        .name(entry.getKey())
                        .totalCnt(rentCnt.get())
                        .build());
            } else if (pmLendRtnHstryRequestDto.getRetf().equals("return")) {
                operatorStat.add(BarChartData.builder()
                        .name(entry.getKey())
                        .totalCnt(returnCnt.get())
                        .build());
            } else {
                operatorStat.add(BarChartData.builder()
                        .name(entry.getKey())
                        .totalCnt(rentCnt.get() + returnCnt.get())
                        .bottomCnt(rentCnt.get())
                        .topCnt(returnCnt.get())
                        .build());
            }

        });

        // 지역별 데이터 추출
        Map<String, Long> rentSpotMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            if (pmLendRtnHstry.getRent_spot() == null || pmLendRtnHstry.getRent_spot().equals("") || pmLendRtnHstry.getRent_spot().equals("-")) {
                pmLendRtnHstry.setRent_spot("미분류");
            }
            return pmLendRtnHstry;
        }).collect(
                Collectors.groupingBy(PmLendRtnHstry::getRent_spot, Collectors.counting()));

        Map<String, Long> returnSpotMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            if (pmLendRtnHstry.getReturn_spot() == null || pmLendRtnHstry.getReturn_spot().equals("") || pmLendRtnHstry.getReturn_spot().equals("-")) {
                pmLendRtnHstry.setReturn_spot("미분류");
            }
            return pmLendRtnHstry;
        }).collect(
                Collectors.groupingBy(PmLendRtnHstry::getReturn_spot, Collectors.counting()));

        if (!pmLendRtnHstryRequestDto.getRetf().equals("return")) {
            rentSpotMap.entrySet().stream().forEach(entry -> {
                if (!pmLendRtnHstryRequestDto.getRetf().equals("rent") && returnSpotMap.containsKey(entry.getKey())) {
                    spotBarStat.add(BarChartData.builder()
                            .name(entry.getKey())
                            .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                            .topCnt(Integer.valueOf(returnSpotMap.get(entry.getKey()).intValue()))
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()) + Integer.valueOf(returnSpotMap.get(entry.getKey()).intValue()))
                            .build());
                    spotPieStat.add(PieChartData.builder()
                            .name(entry.getKey())
                            .value1(Integer.valueOf(entry.getValue().intValue()))
                            .value2(Integer.valueOf(returnSpotMap.get(entry.getKey()).intValue()))
                            .value(Integer.valueOf(entry.getValue().intValue()) + Integer.valueOf(returnSpotMap.get(entry.getKey()).intValue()))
                            .build());
                } else { // rent만
                    spotBarStat.add(BarChartData.builder()
                            .name(entry.getKey())
                            .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                            .topCnt(0)
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .build());
                    spotPieStat.add(PieChartData.builder()
                            .name(entry.getKey())
                            .value1(Integer.valueOf(entry.getValue().intValue()))
                            .value2(0)
                            .value(Integer.valueOf(entry.getValue().intValue()))
                            .build());
                }
            });
        } else {
            returnSpotMap.entrySet().stream().forEach(entry -> {
                spotBarStat.add(BarChartData.builder()
                        .name(entry.getKey())
                        .bottomCnt(0)
                        .topCnt(Integer.valueOf(entry.getValue().intValue()))
                        .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                        .build());
                spotPieStat.add(PieChartData.builder()
                        .name(entry.getKey())
                        .value1(0)
                        .value2(Integer.valueOf(entry.getValue().intValue()))
                        .value(Integer.valueOf(entry.getValue().intValue()))
                        .build());
            });
        }

        if (pmLendRtnHstryRequestDto.getRetf().equals("")) {
            returnSpotMap.entrySet().stream().forEach(entry -> {
                if (!rentSpotMap.containsKey(entry.getKey())) {
                    spotBarStat.add(BarChartData.builder()
                            .name(entry.getKey())
                            .bottomCnt(0)
                            .topCnt(Integer.valueOf(entry.getValue().intValue()))
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .build());
                    spotPieStat.add(PieChartData.builder()
                            .name(entry.getKey())
                            .value1(0)
                            .value2(Integer.valueOf(entry.getValue().intValue()))
                            .value(Integer.valueOf(entry.getValue().intValue()))
                            .build());
                }
            });
        }

        // 시간대별 데이터 추출
        DecimalFormat decimalFormat = new DecimalFormat("00");

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime currentDate = LocalDateTime.of(
                now.getYear(),
                now.getMonth(),
                now.getDayOfMonth(),
                now.getHour(),
                0,
                0,
                0
        );

        Map<Integer, Long> rentTimeMap = pmLendRtnHstryList.stream().filter(pmLendRtnHstry -> pmLendRtnHstry.getLend_dt() != null).map(pmLendRtnHstry -> {
            LocalDateTime localDateTime = pmLendRtnHstry.getLend_dt().toLocalDateTime();
            return localDateTime.getHour();
        }).collect(
                Collectors.groupingBy(hour -> hour, Collectors.counting()));

        Map<Integer, Long> returnTimeMap = pmLendRtnHstryList.stream().filter(pmLendRtnHstry -> pmLendRtnHstry.getRtn_dt() != null).map(pmLendRtnHstry -> {
            LocalDateTime localDateTime = pmLendRtnHstry.getRtn_dt().toLocalDateTime();
            return localDateTime.getHour();
        }).collect(
                Collectors.groupingBy(hour -> hour, Collectors.counting()));

        if (!pmLendRtnHstryRequestDto.getRetf().equals("return")) {
            rentTimeMap.entrySet().stream().forEach(entry -> {
                if (pmLendRtnHstryRequestDto.getRetf().equals("") && returnTimeMap.containsKey(entry.getKey())) { // rent + return
                    timeStat.add(LineChartData.builder()
                            .firstCnt(Integer.valueOf(entry.getValue().intValue()))
                            .secondCnt(Integer.valueOf(returnTimeMap.get(entry.getKey()).intValue()))
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()) + Integer.valueOf(returnTimeMap.get(entry.getKey()).intValue()))
                            .x(decimalFormat.format(entry.getKey()))
                            .build());
                } else if (pmLendRtnHstryRequestDto.getRetf().equals("")) {
                    timeStat.add(LineChartData.builder()
                            .firstCnt(Integer.valueOf(entry.getValue().intValue()))
                            .secondCnt(0)
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .x(decimalFormat.format(entry.getKey()))
                            .build());
                }

                if (pmLendRtnHstryRequestDto.getRetf().equals("rent")) { // rent만
                    timeStat.add(LineChartData.builder()
                            .firstCnt(Integer.valueOf(entry.getValue().intValue()))
                            .secondCnt(0)
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .x(decimalFormat.format(entry.getKey()))
                            .build());
                }
            });
        } else {
            returnTimeMap.entrySet().stream().forEach(entry -> {
                timeStat.add(LineChartData.builder()
                        .firstCnt(0)
                        .secondCnt(Integer.valueOf(entry.getValue().intValue()))
                        .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                        .x(decimalFormat.format(entry.getKey()))
                        .build());
            });
        }

        if (pmLendRtnHstryRequestDto.getRetf().equals("")) {
            returnTimeMap.entrySet().stream().forEach(entry -> { // return만
                if (!rentTimeMap.containsKey(entry.getKey())) {
                    timeStat.add(LineChartData.builder()
                            .firstCnt(0)
                            .secondCnt(Integer.valueOf(entry.getValue().intValue()))
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .x(decimalFormat.format(entry.getKey()))
                            .build());
                }
            });
        }

        if (pmLendRtnHstryRequestDto.getRetf().equals("")) {
            timeStat.addAll(IntStream.rangeClosed(0, 23)
                    .filter(i -> !rentTimeMap.containsKey(i) && !returnTimeMap.containsKey(i))
                    .mapToObj(i -> LineChartData.builder()
                            .firstCnt(0)
                            .secondCnt(0)
                            .totalCnt(0)
                            .x(decimalFormat.format(i))
                            .build())
                    .collect(Collectors.toList()));
        } else if (pmLendRtnHstryRequestDto.getRetf().equals("rent")) {
            timeStat.addAll(IntStream.rangeClosed(0, 23)
                    .filter(i -> !rentTimeMap.containsKey(i))
                    .mapToObj(i -> LineChartData.builder()
                            .firstCnt(0)
                            .secondCnt(0)
                            .totalCnt(0)
                            .x(decimalFormat.format(i))
                            .build())
                    .collect(Collectors.toList()));
        } else if (pmLendRtnHstryRequestDto.getRetf().equals("return")) {
            timeStat.addAll(IntStream.rangeClosed(0, 23)
                    .filter(i -> !returnTimeMap.containsKey(i))
                    .mapToObj(i -> LineChartData.builder()
                            .firstCnt(0)
                            .secondCnt(0)
                            .totalCnt(0)
                            .x(decimalFormat.format(i))
                            .build())
                    .collect(Collectors.toList()));
        }

        // PM 종류별 데이터 추출
        Map<String, Long> kindMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            if (pmLendRtnHstry.getPm_type() == null || pmLendRtnHstry.getPm_type().equals("") || pmLendRtnHstry.getPm_type().equals("-")) {
                pmLendRtnHstry.setPm_type("미분류");
            }
            return pmLendRtnHstry;
        }).collect(
                Collectors.groupingBy(PmLendRtnHstry::getPm_type, Collectors.counting()));

        kindMap.entrySet().stream().forEach(entry->{
            kindStat.add(BarChartData.builder()
                            .name(entry.getKey())
                            .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                            .build());
        });

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

        // 대여
        Map<Integer, Long> rentDowMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            LocalDateTime rentTime = pmLendRtnHstry.getLend_dt().toLocalDateTime();
            DayOfWeek rentDayOfWeek = rentTime.getDayOfWeek();

            return rentDayOfWeek;
        }).collect(Collectors.groupingBy(DayOfWeek::getValue, Collectors.counting()));

        // 반납
        Map<Integer, Long> returnDowMap = pmLendRtnHstryList.stream().map(pmLendRtnHstry -> {
            LocalDateTime returnTime = pmLendRtnHstry.getRtn_dt().toLocalDateTime();
            DayOfWeek returnDayOfWeek = returnTime.getDayOfWeek();

            return returnDayOfWeek;
        }).collect(Collectors.groupingBy(DayOfWeek::getValue, Collectors.counting()));

        // (일, 월, 화, 수, 목, 금, 토) 순서 (rent - bottom, return - top)
        if (pmLendRtnHstryRequestDto.getRetf().equals("rent")) {
            dowStat.addAll(IntStream.rangeClosed(1, 6)
                    .mapToObj(i -> BarChartData.builder()
                            .name(dowConvertMap.get(i))
                            .totalCnt(rentDowMap.containsKey(i) ? Integer.valueOf(rentDowMap.get(i).intValue()) : 0)
                            .build())
                    .collect(Collectors.toList()));

            if (rentDowMap.containsKey(7)) {
                dowStat.add(0, BarChartData.builder()
                        .name(dowConvertMap.get(7))
                        .totalCnt(Integer.valueOf(rentDowMap.get(7).intValue()))
                        .build());
            } else {
                dowStat.add(0, BarChartData.builder()
                        .name(dowConvertMap.get(7))
                        .totalCnt(0)
                        .build());
            }
        } else if (pmLendRtnHstryRequestDto.getRetf().equals("return")) {
            dowStat.addAll(IntStream.rangeClosed(1, 6)
                    .mapToObj(i -> BarChartData.builder()
                            .name(dowConvertMap.get(i))
                            .totalCnt(returnDowMap.containsKey(i) ? Integer.valueOf(returnDowMap.get(i).intValue()) : 0)
                            .build())
                    .collect(Collectors.toList()));

            if (returnDowMap.containsKey(7)) {
                dowStat.add(0, BarChartData.builder()
                        .name(dowConvertMap.get(7))
                        .totalCnt(Integer.valueOf(returnDowMap.get(7).intValue()))
                        .build());
            } else {
                dowStat.add(0, BarChartData.builder()
                        .name(dowConvertMap.get(7))
                        .totalCnt(0)
                        .build());
            }
        } else {
            // 전체는 월, 화, 수, 목, 금, 토, 일이 모두 출력되지 않음
            rentDowMap.entrySet().stream().forEach(entry -> {
                if (entry.getKey() == 7) {
                    if (returnDowMap.containsKey(entry.getKey())) {
                        dowStat.add(0, BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                                .topCnt(Integer.valueOf(returnDowMap.get(7).intValue()))
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()) + Integer.valueOf(returnDowMap.get(7).intValue()))
                                .build());
                    } else {
                        dowStat.add(0, BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                                .topCnt(0)
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                                .build());
                    }
                } else {
                    if (returnDowMap.containsKey(entry.getKey())) {
                        dowStat.add(BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                                .topCnt(Integer.valueOf(returnDowMap.get(entry.getKey()).intValue()))
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()) + Integer.valueOf(returnDowMap.get(entry.getKey()).intValue()))
                                .build());
                    } else {
                        dowStat.add(BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(Integer.valueOf(entry.getValue().intValue()))
                                .topCnt(0)
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                                .build());
                    }
                }
            });

            returnDowMap.entrySet().stream().forEach(entry -> {
                if (!rentDowMap.containsKey(entry.getKey())) {
                    if (entry.getKey() == 7) {
                        dowStat.add(0, BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(0)
                                .topCnt(Integer.valueOf(entry.getValue().intValue()))
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                                .build());
                    } else {
                        dowStat.add(BarChartData.builder()
                                .name(dowConvertMap.get(entry.getKey()))
                                .bottomCnt(0)
                                .topCnt(Integer.valueOf(entry.getValue().intValue()))
                                .totalCnt(Integer.valueOf(entry.getValue().intValue()))
                                .build());
                    }
                }
            });
        }

        // 요일-시간대별 데이터 추출
        Map<DowTimeKey, Long> dowTimeMap = null;

        if (pmLendRtnHstryRequestDto.getRetf().equals("rent")) { // 대여일 경우
            dowTimeMap = pmLendRtnHstryList.stream().filter(pmLendRtnHstry -> pmLendRtnHstry.getLend_dt() != null)
                    .collect(Collectors.groupingBy(pmLendRtnHstry -> {
                        LocalDateTime rentTime = pmLendRtnHstry.getLend_dt().toLocalDateTime();
                        DayOfWeek rentDayOfWeek = rentTime.getDayOfWeek();

                        return new DowTimeKey(rentDayOfWeek, rentTime.getHour());
                    }, Collectors.counting()));
        } else if (pmLendRtnHstryRequestDto.getRetf().equals("return")) { // 반납일 경우
            dowTimeMap = pmLendRtnHstryList.stream().filter(pmLendRtnHstry -> pmLendRtnHstry.getRtn_dt() != null)
                    .collect(Collectors.groupingBy(pmLendRtnHstry -> {
                        LocalDateTime returnTime = pmLendRtnHstry.getRtn_dt().toLocalDateTime();
                        DayOfWeek rentDayOfWeek = returnTime.getDayOfWeek();

                        return new DowTimeKey(rentDayOfWeek, returnTime.getHour());
                    }, Collectors.counting()));
        }

        for (DayOfWeek dayOfWeek : DayOfWeek.values()) { // 전체 요일 순환
            for (int i = 0; i <= 23; i++) { // 전체 시간 순환
                DowTimeKey temp = new DowTimeKey(dayOfWeek, i);

                if (dowTimeMap.containsKey(temp)) {
                    dowTimeStat.add(BubbleHeatMapData.builder()
                            .hour(hourConverter(temp.getHour()))
                            .weekday(dowConvertMap.get(temp.getDayOfWeek().getValue()))
                            .value(Integer.valueOf(dowTimeMap.get(temp).intValue()))
                            .build());
                } else {
                    dowTimeStat.add(BubbleHeatMapData.builder()
                            .hour(hourConverter(temp.getHour()))
                            .weekday(dowConvertMap.get(temp.getDayOfWeek().getValue()))
                            .value(0)
                            .build());
                }
            }
        }

        Collections.sort(operatorStat, Collections.reverseOrder());
        Collections.sort(spotBarStat, Collections.reverseOrder());
        Collections.sort(spotPieStat, Collections.reverseOrder());
        Collections.sort(kindStat, Collections.reverseOrder());
        Collections.sort(timeStat);

        return PmLendRtnHstryGraphResponseDto.builder()
                .isChartStacked(pmLendRtnHstryRequestDto.getRetf().equals("rent") || pmLendRtnHstryRequestDto.getRetf().equals("return") ? false : true)
                .operatorBarChartBottomCntName("대여")
                .operatorBarChartTopCntName("반납")
                .spotBarChartBottomCntName("대여")
                .spotBarChartTopCntName("반납")
                .timeLineChartFirstCntName("대여")
                .timeLineChartSecondCntName("반납")
                .dowBarChartBottomCntName("대여")
                .dowBarChartTopCntName("반납")
                .operatorStat(operatorStat)
                .spotPieStat(spotPieStat.size() >= 5 ?
                        spotPieStat.subList(0, 5) : spotPieStat)
                .spotBarStat(spotBarStat)
                .timeStat(timeStat)
                .kindStat(kindStat)
                .dowStat(dowStat)
                .dowTimeStat(dowTimeStat)
                .build();
    }
}
