package net.datahub.tv.common.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.datahub.tv.common.model.TvCommonSearchCondition;

/**
 * @ Class Name  : TvCompareMapper.java
 * @ Description : 교통 약자 시설 비교 Mapper
 * @ author :
 * @ since : 2023/08/23
 * @
 * @ Modification Information
 * @ 수정일      		   수정자           수정 내용
 * @ -------------     ----------     -------------------------------
 * @ 2023/08/23                  최초 생성
 * @ version : 1.0.0
 * @ see
 * Copyright (C) by MetisInfo All right reserved.
 **/
@Mapper(value = "tvCompareMapper")
public interface TvCompareMapper {

    EgovMap cctvCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap crossWalkCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap childPickupZoneCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap oneWayRoadCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap crossRoadCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap childWaySchoolCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap speedBumpCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
    EgovMap fenceCompareInformation(TvCommonSearchCondition tvCommonSearchCondition);
}
