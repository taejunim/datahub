package net.tv.weather.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;

import java.util.List;
import java.util.Map;

/**
 * packageName    : net.tv.weather.mapper
 * fileName       : WeatherMapper
 * author         : joyouyeong
 * date           : 2023/10/17
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/10/17       joyouyeong       최초 생성
 */
@Mapper(value = "weatherMapper")
public interface WeatherMapper {

    List<WeatherModel> selectWeatherStationNo();

    List<SpeedDecisionMaking> getBarChartDataByCarWeather(Map<String, Object> parameter);
    List<SpeedDecisionMaking> getPieChartDataByCarWeather(Map<String, Object> parameter);

    List<SpeedDecisionMaking> getBarChartDataByPopulationWeatherDay(Map<String, Object> parameter);
    List<SpeedDecisionMaking> getBarChartDataByPopulationWeatherMonthYear(Map<String, Object> parameter);

    List<SpeedDecisionMaking> getPieChartDataByPopulationWeatherDay(Map<String, Object> parameter);
    List<SpeedDecisionMaking> getPieChartDataByPopulationWeatherMonthYear(Map<String, Object> parameter);

    List<WeatherModel> getDataByWeatherYearMonthDay(Map<String , Object> parameter);

    int insertWeatherHistory(List<WeatherModel> list);

    int insertWeatherSummaryCount(Map<String, Object> parameter);

}
