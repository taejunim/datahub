package net.datahub.tv.common.service.impl;

import net.datahub.tv.common.mapper.TvCommonMapper;
import net.datahub.tv.common.mapper.TvCompareMapper;
import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.datahub.tv.common.service.TvCompareService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @ Class Name  : TvCompareServiceImpl.java
 * @ Description : 교통 약자 시설 비교 ServiceImpl
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
@Service
public class TvCompareServiceImpl implements TvCompareService {

    @Resource(name="tvCompareMapper")
    private TvCompareMapper tvCompareMapper;

    @Resource(name="tvCommonMapper")
    private TvCommonMapper tvCommonMapper;

    @Override
    public Map<String, Object> getFacilityCompareData(TvCommonSearchCondition tvCommonSearchCondition) {
        Map<String, Object> result = new HashMap<>();

        result.put("protectionZoneTotalCount", tvCommonMapper.safetyAreaInformation(tvCommonSearchCondition).size());
        result.put("cctvCompare", tvCompareMapper.cctvCompareInformation(tvCommonSearchCondition));
        result.put("childPickupZoneCompare", tvCompareMapper.childPickupZoneCompareInformation(tvCommonSearchCondition));
        result.put("childWaySchoolCompare", tvCompareMapper.childWaySchoolCompareInformation(tvCommonSearchCondition));
        result.put("crossRoadCompare", tvCompareMapper.crossRoadCompareInformation(tvCommonSearchCondition));
        result.put("crossWalkCompare", tvCompareMapper.crossWalkCompareInformation(tvCommonSearchCondition));
        result.put("oneWayRoadCompare", tvCompareMapper.oneWayRoadCompareInformation(tvCommonSearchCondition));
        result.put("speedBumpCompare", tvCompareMapper.speedBumpCompareInformation(tvCommonSearchCondition));
        result.put("fenceCompare", tvCompareMapper.fenceCompareInformation(tvCommonSearchCondition));

        return result;
    }

}
