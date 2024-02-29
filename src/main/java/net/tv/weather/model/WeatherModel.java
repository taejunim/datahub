package net.tv.weather.model;

import lombok.Data;
/**
 * packageName    : net.tv.weather.model
 * fileName       : WeatherModel
 * author         : joyouyeong
 * date           : 2023/10/17
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/10/17       joyouyeong       최초 생성
 */
@Data
public class WeatherModel {

    private String weatherStationNo;                // 관측소 번호
    private String meteringDate;                    // 관측 날짜
    private String meteringHour;                    // 관측 시간
    private String weatherType;                     // 날씨
    private String temperature;                     // 기온
    private String windSpeed;                       // 풍속
    private String windType;                        // 풍향
    private String weatherName;                     // 날씨명
    private String weatherPreparedStatement;        // preparedStatement 오류 해결을 위한 임시 쿼리
    private String count;                             // 날씨별 카운트

}
