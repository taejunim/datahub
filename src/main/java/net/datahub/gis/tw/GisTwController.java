package net.datahub.gis.tw;

import net.datahub.gis.tw.service.GisTwService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * @ Class Name  : GisTwController.java
 * @ Description : 생활 안전 지도 교통 약자 controller
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
@Controller
public class GisTwController {

    @Inject
    private GisTwService gisTwService;

    @RequestMapping(value = "/gisTw/selectCctvInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectCctvInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectCctvInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectChildSafetyInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectChildSafetyInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectChildSafetyInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectChildSafetyAreaInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectChildSafetyAreaInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("resultArea", gisTwService.selectChildSafetyAreaInformation());
        result.put("resultPoint", gisTwService.selectChildSafetyAreaLocationInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectEldSafetyAreaInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectEldSafetyAreaInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("resultArea", gisTwService.selectEldSafetyAreaInformation());
        result.put("resultPoint", gisTwService.selectEldSafetyAreaLocationInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectPwdbsSafetyAreaInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectPwdbsSafetyAreaInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("resultArea", gisTwService.selectPwdbsSafetyAreaInformation());
        result.put("resultPoint", gisTwService.selectPwdbsSafetyAreaLocationInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectChildPickupZoneInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectChildPickupZoneInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectChildPickupZoneInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectChildWaySchoolInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectChildWaySchoolInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectChildWaySchoolInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectCrossWalkInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectCrossWalkInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectCrossWalkInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectCrossWayInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectCrossWayInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectCrossWayInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectOneWayRoadInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectOneWayRoadInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectOneWayRoadInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectSpeedBumpInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectSpeedBumpInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectSpeedBumpInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectFenceInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectFenceInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectFenceInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectRoadSafetyInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectRoadSafetyInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectRoadSafetyInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectRoadWorkZoneInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectRoadWorkZoneInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectRoadWorkZoneInformation());

        return result;
    }

    @RequestMapping(value = "/gisTw/selectRoadControlInformation.json", method= RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectRoadControlInformation() {

        Map<String, Object> result = new HashMap<>();
        result.put("result", gisTwService.selectRoadControlInformation());

        return result;
    }
}
