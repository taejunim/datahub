package net.datahub.gis.tw.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

import java.util.List;

/**
 * @ Class Name  : GisTwMapper.java
 * @ Description : 생활안전지도 교통 약자 mapper
 * @ author :
 * @ since : 2023/06/02
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2023/06/02                    최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Mapper(value = "gisTwMapper")
public interface GisTwMapper {

    List<EgovMap> selectCctvInformation();

    List<EgovMap> selectChildSafetyInformation();

    List<EgovMap> selectChildSafetyAreaInformation();

    List<EgovMap> selectChildSafetyAreaLocationInformation();

    List<EgovMap> selectEldSafetyAreaInformation();

    List<EgovMap> selectEldSafetyAreaLocationInformation();

    List<EgovMap> selectPwdbsSafetyAreaInformation();

    List<EgovMap> selectPwdbsSafetyAreaLocationInformation();

    List<EgovMap> selectChildPickupZoneInformation();

    List<EgovMap> selectChildWaySchoolInformation();

    List<EgovMap> selectCrossWalkInformation();

    List<EgovMap> selectCrossWayInformation();

    List<EgovMap> selectOneWayRoadInformation();

    List<EgovMap> selectSpeedBumpInformation();

    List<EgovMap> selectFenceInformation();

    List<EgovMap> selectRoadSafetyInformation();

    List<EgovMap> selectRoadControlInformation();

    List<EgovMap> selectRoadWorkZoneInformation();
}
