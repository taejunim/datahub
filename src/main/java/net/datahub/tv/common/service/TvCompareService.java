package net.datahub.tv.common.service;

import net.datahub.tv.common.model.TvCommonSearchCondition;

import java.util.Map;

/**
 * @ Class Name  : TvCompareService.java
 * @ Description : 교통 약자 시설 비교 Service
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

public interface TvCompareService {

    Map<String, Object> getFacilityCompareData(TvCommonSearchCondition tvCommonSearchCondition);
}
