package net.tv.weather.service;

import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;

import java.util.List;
import java.util.Map;

/**
 * packageName    : net.tv.weather.service
 * fileName       : WeatherService
 * author         : joyouyeong
 * date           : 2023/10/17
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/10/17       joyouyeong       최초 생성
 */
public interface WeatherService {
    List<WeatherModel> selectWeatherStationNo();
    Map<String, Object> getWeatherChartData(Map<String, Object> parameter);
    int insertWeatherHistory(List<WeatherModel> list);

    int insertWeatherSummaryCount(Map<String, Object> parameter);
}
