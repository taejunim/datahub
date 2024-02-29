package net.datahub.tv.common.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;

import java.util.List;
import java.util.Map;

/**
 * @ Class Name  : TvCommonMapper.java
 * @ Description : 교통 약자 공통 mapper
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
@Mapper(value = "tvCommonMapper")
public interface TvCommonMapper {

    /** 어린이 보호구역 검색 */
    List<EgovMap> safetyAreaInformation(TvCommonSearchCondition tvCommonSearchCondition);
    /** 장애인 보호구역 검색 */
    List<EgovMap> safetyPwdbsAreaInformation(TvCommonSearchCondition tvCommonSearchCondition);
    /** 노안 보호구역 검색 */
    List<EgovMap> safetyEldAreaInformation(TvCommonSearchCondition tvCommonSearchCondition);

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

    List<SpeedDecisionMaking> getBarChartDataByCarType(SpeedDecisionMaking speedDecisionMaking);
    List<SpeedDecisionMaking> getPieChartDataByCarType(SpeedDecisionMaking speedDecisionMaking);

    /** 날씨 별 교통 통행량 조회 (날씨 Join 위한 임시 select) */
    List<WeatherModel> getTrafficTempWeatherData(SpeedDecisionMaking speedDecisionMaking);
}
