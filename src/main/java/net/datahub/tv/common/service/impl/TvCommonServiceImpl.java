package net.datahub.tv.common.service.impl;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.datahub.tv.common.mapper.TvCommonMapper;
import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.datahub.tv.common.service.TvCommonService;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.model.WeatherSummaryModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ Class Name  : TvCommonServiceImpl.java
 * @ Description : 교통 약자 공통 serviceImpl
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
@Service
public class TvCommonServiceImpl implements TvCommonService {

    @Resource (name="tvCommonMapper")
    private TvCommonMapper tvCommonMapper;

    @Override
    public List<EgovMap> safetyAreaInformation(TvCommonSearchCondition tvCommonSearchCondition) {
        List<EgovMap> result = new ArrayList<>();

        /**
         * 보호구역 추가 후 여기서 조회조건에 따라서 return 처리
         * */
        //어린이 보호구역
        if(tvCommonSearchCondition.getSafetyAreaType().equals("0"))
            result = tvCommonMapper.safetyAreaInformation(tvCommonSearchCondition);
        //노인 보호구역
        else if(tvCommonSearchCondition.getSafetyAreaType().equals("1"))
            result = tvCommonMapper.safetyEldAreaInformation(tvCommonSearchCondition);
        //노인 보호구역
        else if(tvCommonSearchCondition.getSafetyAreaType().equals("2"))
            result = tvCommonMapper.safetyPwdbsAreaInformation(tvCommonSearchCondition);

        else {
            result.addAll(tvCommonMapper.safetyAreaInformation(tvCommonSearchCondition));
            result.addAll(tvCommonMapper.safetyEldAreaInformation(tvCommonSearchCondition));
            result.addAll(tvCommonMapper.safetyPwdbsAreaInformation(tvCommonSearchCondition));
        }
        return result;
    }

    /** 반경 내 보호구역 조회 시작 */
    @Override
    public int selectAreaCctvCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaCctvCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaChildPickupZoneCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaChildPickupZoneCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaChildWaySchoolCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaChildWaySchoolCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaCrossWalkCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaCrossWalkCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaCrossRoadCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaCrossRoadCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaOneWayRoadCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaOneWayRoadCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaSpeedBumpCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaSpeedBumpCount(tvCommonSearchCondition);
    }
    @Override
    public int selectAreaFenceCount(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.selectAreaFenceCount(tvCommonSearchCondition);
    }
    /** 반경 내 보호구역 조회 끝 */
    @Override
    public List<String> getCellId(TvCommonSearchCondition tvCommonSearchCondition){
        return tvCommonMapper.getCellId(tvCommonSearchCondition);
    }

    @Override
    public List<WeatherSummaryModel> getCellLocationInformation(){
        return tvCommonMapper.getCellLocationInformation();
    }

    @Override
    public Map<String,Object> getCarTrafficChartData(SpeedDecisionMaking speedDecisionMaking) {

        Map<String, Object> result = new HashMap<String, Object>();

        List<SpeedDecisionMaking> tempList = new ArrayList<>();

        result.put("barChartDataByCarType", tvCommonMapper.getBarChartDataByCarType(speedDecisionMaking));
        result.put("pieChartDataByCarType", tvCommonMapper.getPieChartDataByCarType(speedDecisionMaking));

        return result;
    }

    @Override
    public List<WeatherModel> getTrafficTempWeatherData(SpeedDecisionMaking speedDecisionMaking) {
        return tvCommonMapper.getTrafficTempWeatherData(speedDecisionMaking);
    }
}
