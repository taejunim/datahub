package net.datahub.tv.common.model;

import lombok.Data;

/**
 * @ Class Name  : TvCommonSearchCondition.java
 * @ Description : 교통 약자 공통 조회조건 model
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
@Data
public class TvCommonSearchCondition {

    public String safetyAreaType;       //보호구역 종류
    public String safetyAreaName;       //보호구역명
    public String sctn_id;              //통행 구분

    public String latitude;             //경도
    public String longitude;            //위도
    public String distance;             //거리
    public String selectedCoordinates;
}