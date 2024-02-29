package net.datahub.tv.common;

import net.datahub.tv.common.model.TvCommonSearchCondition;
import net.datahub.tv.common.service.TvCommonService;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.datahub.tv.common.service.TvCompareService;
import net.tv.weather.model.WeatherModel;
import net.tv.weather.service.WeatherService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ Class Name  : TvCommonController.java
 * @ Description : 교통 약자 공통 controller
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
@Controller
public class TvCommonController {

    @Inject
    private TvCommonService tvCommonService;

    @Inject
    private TvCompareService tvCompareService;

    @Inject
    private WeatherService weatherService;

    @RequestMapping(value = "/tv/common/safetyAreaInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> safetyAreaInformation(TvCommonSearchCondition tvCommonSearchCondition) {

        Map<String, Object> result = new HashMap<>();
        result.put("result", tvCommonService.safetyAreaInformation(tvCommonSearchCondition));

        return result;
    }

    @RequestMapping(value = "/tv/common/selectAreaFacilityCount.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectAreaFacilityCount(TvCommonSearchCondition tvCommonSearchCondition){

        //반경 설정 300m
        tvCommonSearchCondition.setDistance("0.3");
        Map<String, Object> result = new HashMap<>();
        result.put("cctvCount", tvCommonService.selectAreaCctvCount(tvCommonSearchCondition));
        result.put("childPickupZoneCount", tvCommonService.selectAreaChildPickupZoneCount(tvCommonSearchCondition));
        result.put("childWaySchoolCount", tvCommonService.selectAreaChildWaySchoolCount(tvCommonSearchCondition));
        result.put("crossWalkCount", tvCommonService.selectAreaCrossWalkCount(tvCommonSearchCondition));
        result.put("crossRoadCount", tvCommonService.selectAreaCrossRoadCount(tvCommonSearchCondition));
        result.put("oneWayRoadCount", tvCommonService.selectAreaOneWayRoadCount(tvCommonSearchCondition));
        result.put("speedBumpCount", tvCommonService.selectAreaSpeedBumpCount(tvCommonSearchCondition));
        result.put("fenceCount", tvCommonService.selectAreaFenceCount(tvCommonSearchCondition));
        return result;

    }

    @RequestMapping(value = "/tv/common/getCellId.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getCellId(TvCommonSearchCondition tvCommonSearchCondition){

        Map<String, Object> result = new HashMap<>();
        result.put("cellId", tvCommonService.getCellId(tvCommonSearchCondition));

        return result;
    }

    @RequestMapping(value = "/tv/common/getCarTrafficChartData.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getCarTrafficChartData(@RequestBody SpeedDecisionMaking speedDecisionMaking){

        Map<String, Object> result = new HashMap<>();
        result.put("result", tvCommonService.getCarTrafficChartData(speedDecisionMaking));

        return result;
    }

    @RequestMapping(value = "/tv/common/getChartDataByWeather.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getChartDataByWeather(@RequestBody SpeedDecisionMaking speedDecisionMaking){

        Map<String, Object> parameter = new HashMap<>();

        parameter.put("weatherList", tvCommonService.getTrafficTempWeatherData(speedDecisionMaking));
        parameter.put("period", speedDecisionMaking.getPeriod());
        parameter.put("startDate", speedDecisionMaking.getStartDate());
        parameter.put("endDate", speedDecisionMaking.getEndDate());
        parameter.put("selectedCoordinates", speedDecisionMaking.getSelectedCoordinates());
        parameter.put("cellId", speedDecisionMaking.getCellId());
        parameter.put("selectedCellId", speedDecisionMaking.getCellId());


        Map<String, Object> result = new HashMap<>();
        result.put("result", weatherService.getWeatherChartData(parameter));
        return result;
    }

    @RequestMapping(value = "/tv/common/getFacilityCompareData.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getFacilityCompareData(TvCommonSearchCondition tvCommonSearchCondition){

        //반경 300m
        tvCommonSearchCondition.setDistance("0.3");
        Map<String, Object> result = new HashMap<>();
        result.put("result", tvCompareService.getFacilityCompareData(tvCommonSearchCondition));

        return result;
    }
}
