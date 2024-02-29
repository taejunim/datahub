package net.datahub.martData.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;


@Getter
@Setter
public class WalkCldAcdntOcfrRng extends AcdntOcfr{
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private  Timestamp                 mdfcnDt;     //수정일시         
	private    Integer                 shapeId;     //공간정보 식별자     
	private  Timestamp            shapeIdCrtDt;     //공간정보 식별자 생성일시
	private  Timestamp          shapeIdMdfcnDt;     //공간정보 식별자 수정일시
	private     String               ocfrRngId;     //다발지역 식별자     
	private  Timestamp          ocfrRngIdCrtDt;     //다발지역 식별자 생성일시
	private  Timestamp        ocfrRngIdMdfcnDt;     //다발지역 식별자 수정일시
	private     String                  stdgCd;     //법정동코드        
	private     String                 brnchCd;     //지점코드         
	private     String                   spgNm;     //시도군명         
	private     String                 brnchNm;     //지점명          
	private  Timestamp            rngInfoCrtDt;     //지역정보 생성일시
	private  Timestamp          rngInfoMdfcnDt;     //지역정보 수정일시
	private    Integer               acdntNocs;     //사고건수         
	private    Integer                 caltCnt;     //사상자수         
	private    Integer                 dcsdCnt;     //사망자수         
	private    Integer                 swsnCnt;     //중상자수         
	private    Integer                 sijnCnt;     //경상자수         
	private    Integer               injDclCnt;     //부상신고자수       
	private  Timestamp           dmgeInfoCrtDt;     //피해정보 생성일시    
	private  Timestamp         dmgeInfoMdfcnDt;     //피해정보 수정일시    
	private     String           ocfrRngPynDat;     //다발지역 폴리곤 데이터 
	private  Timestamp      ocfrRngPynDatCrtDt; //다발지역 폴리곤 데이터 생성일시
	private  Timestamp    ocfrRngPynDatMdfcnDt; //다발지역 폴리곤 데이터 수정일시
	private     String           ocfrRngLotLat;     //다발지역 경도 위도   
	private  Timestamp      ocfrRngLotLatCrtDt;   //다발지역 경도 위도 생성일시
	private  Timestamp    ocfrRngLotLatMdfcnDt;   //다발지역 경도 위도 수정일시

	public void setOcfrRngPynDat(String ocfrRngPynDat) {
		this.ocfrRngPynDat = ocfrRngPynDat;
		geom_json = "{\"type\":\"Polygon\",\"coordinates\":"+ocfrRngPynDat+"}";
	}
}