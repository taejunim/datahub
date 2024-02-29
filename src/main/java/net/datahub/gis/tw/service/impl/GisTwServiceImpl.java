package net.datahub.gis.tw.service.impl;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import net.datahub.gis.tw.mapper.GisTwMapper;
import net.datahub.gis.tw.service.GisTwService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @ Class Name  : GisTwServiceImpl.java
 * @ Description : 교통 약자 공통 serviceImpl
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
@Service
public class GisTwServiceImpl implements GisTwService {

    @Resource (name="gisTwMapper")
    private GisTwMapper gisTwMapper;

    @Override
    public List<EgovMap> selectCctvInformation() {
        return gisTwMapper.selectCctvInformation();
    }

    @Override
    public List<EgovMap> selectChildSafetyInformation() { return gisTwMapper.selectChildSafetyInformation(); }

    @Override
    public List<EgovMap> selectChildSafetyAreaInformation() {
        return gisTwMapper.selectChildSafetyAreaInformation();
    }

    @Override
    public List<EgovMap> selectChildSafetyAreaLocationInformation() { return gisTwMapper.selectChildSafetyAreaLocationInformation(); }

    @Override
    public List<EgovMap> selectEldSafetyAreaInformation() {
        return gisTwMapper.selectEldSafetyAreaInformation();
    }

    @Override
    public List<EgovMap> selectEldSafetyAreaLocationInformation() { return gisTwMapper.selectEldSafetyAreaLocationInformation(); }

    @Override
    public List<EgovMap> selectPwdbsSafetyAreaInformation() {
        return gisTwMapper.selectPwdbsSafetyAreaInformation();
    }

    @Override
    public List<EgovMap> selectPwdbsSafetyAreaLocationInformation() { return gisTwMapper.selectPwdbsSafetyAreaLocationInformation(); }

    @Override
    public List<EgovMap> selectChildPickupZoneInformation() {
        return gisTwMapper.selectChildPickupZoneInformation();
    }

    @Override
    public List<EgovMap> selectChildWaySchoolInformation() {
        return gisTwMapper.selectChildWaySchoolInformation();
    }

    @Override
    public List<EgovMap> selectCrossWalkInformation() {
        return gisTwMapper.selectCrossWalkInformation();
    }

    @Override
    public List<EgovMap> selectCrossWayInformation() {
        return gisTwMapper.selectCrossWayInformation();
    }

    @Override
    public List<EgovMap> selectOneWayRoadInformation() {
        return gisTwMapper.selectOneWayRoadInformation();
    }

    @Override
    public List<EgovMap> selectSpeedBumpInformation() {
        return gisTwMapper.selectSpeedBumpInformation();
    }

    @Override
    public List<EgovMap> selectFenceInformation() {
        return gisTwMapper.selectFenceInformation();
    }

    @Override
    public List<EgovMap> selectRoadSafetyInformation() {
        return gisTwMapper.selectRoadSafetyInformation();
    }

    @Override
    public List<EgovMap> selectRoadWorkZoneInformation() { return gisTwMapper.selectRoadWorkZoneInformation(); }

    @Override
    public List<EgovMap> selectRoadControlInformation() {
        return gisTwMapper.selectRoadControlInformation();
    }
}
