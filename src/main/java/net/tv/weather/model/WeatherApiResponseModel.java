package net.tv.weather.model;

import lombok.Data;

/**
 * packageName    : net.tv.weather.model
 * fileName       : WeatherApiResponseModel
 * author         : joyouyeong
 * date           : 2023/10/17
 * description    : 데이터 파싱을 위한 API 응답 Model
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/10/17       joyouyeong       최초 생성
 */
@Data
public class WeatherApiResponseModel {

    private String tm;          //시간
    private String ta;          //기온
    private String rn;          //강수량
    private String rnQcflg;     //강수량 품질검사 플래그
    private String wd;          //풍향
    private String ws;          //풍속
    private String dc10Tca;     //전운량
    private String dmstMtphNo;  //현상번호
}
