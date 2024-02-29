package net.datahub.martData.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;

@Getter
@Setter
public class LnkgBaseAcdntRiskRng extends BaseModel {
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private  Timestamp                 mdfcnDt;     //수정일시         
	private     String          acdntRiskRngId;     //사고위험지역 식별자   
	private  Timestamp     acdntRiskRngIdCrtDt;   //사고위험지역 식별자 생성일시
	private  Timestamp   acdntRiskRngIdMdfcnDt;   //사고위험지역 식별자 수정일시
	private     String          acdntRiskRngNm;     //사고위험지역명      
	private  Timestamp     acdntRiskRngNmCrtDt;     //사고위험지역명 생성일시 
	private  Timestamp   acdntRiskRngNmMdfcnDt;     //사고위험지역명 수정일시 
	private     String            acdntRiskRng;     //사고위험지역
	private  Timestamp       acdntRiskRngCrtDt;     //사고위험지역 생성일시
	private  Timestamp     acdntRiskRngMdfcnDt;     //사고위험지역 수정일시
	private    Integer               acdntNocs;     //사고건수         
	private    Integer                 dcsdCnt;     //사망자수         
	private    Integer                 swsnCnt;     //중상자수         
	private    Integer                 sijnCnt;     //경상자수         
	private    Integer               injDclCnt;     //부상신고자수       
	private  Timestamp           dmgeInfoCrtDt;     //피해정보 생성일시    
	private  Timestamp         dmgeInfoMdfcnDt;     //피해정보 수정일시    
	private     String                 ceptCrd;     //중심점 좌표       
	private  Timestamp            ceptCrdCrtDt;     //중심점 좌표 생성일시  
	private  Timestamp          ceptCrdMdfcnDt;     //중심점 좌표 수정일시  
	private     String        acdntAnlsTypeDtl;     //사고분석유형세부     
	private  Timestamp   acdntAnlsTypeDtlCrtDt;     //사고분석유형세부 생성일시
	private  Timestamp acdntAnlsTypeDtlMdfcnDt;     //사고분석유형세부 수정일시
	private     String         acdntAnlsTypeNm;     //사고분석유형명      
	private  Timestamp    acdntAnlsTypeNmCrtDt;     //사고분석유형명 생성일시 
	private  Timestamp  acdntAnlsTypeNmMdfcnDt;     //사고분석유형명 수정일시 
}