package net.datahub.tv.common.service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;

import java.util.List;
import java.util.Map;

/**
 * @ Class Name  : TvCommonService.java
 * @ Description : 교통 약자 공통 service
 * @ author :
 * @ since : 2023/06/01
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2023/06/01                    최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
public interface TvCommonService {

    List<EgovMap> safetyAreaInformation(TvCommonSearchCondition tvCommonSearchCondition);

    /** 반경 내 보호구역 조회 시작 */
    int selectAreaCctvCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaChildPickupZoneCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaChildWaySchoolCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaCrossWalkCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaCrossRoadCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaOneWayRoadCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaSpeedBumpCount(TvCommonSearchCondition tvCommonSearchCondition);
    int selectAreaFenceCount(TvCommonSearchCondition tvCommonSearchCondition);
    /** 반경 내 보호구역 조회 끝 */
    List<String> getCellId(TvCommonSearchCondition tvCommonSearchCondition);
    List<WeatherSummaryModel> getCellLocationInformation();

    Map<String, Object> getCarTrafficChartData(SpeedDecisionMaking speedDecisionMaking);

    List<WeatherModel> getTrafficTempWeatherData(SpeedDecisionMaking speedDecisionMaking);
}
