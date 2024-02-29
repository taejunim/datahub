package net.datahub.martData.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;


@Getter
@Setter
public class DthTrnsAcdntRngInfo extends BaseModel {
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private  Timestamp                 mdfcnDt;     //수정일시         
	private     String                ocrnDtYr;     //발생일시 연도      
	private     String           ocrnDtMmDayHr;    //발생일시 발생일시 월일시간
	private     String            ocrnDtDnSeCd;     //발생일시 주야구분코드  
	private     String            ocrnDtDdwkCd;     //발생일시 요일 코드   
	private  Timestamp             ocrnDtCrtDt;     //발생일시 생성일시    
	private  Timestamp           ocrnDtMdfcnDt;     //발생일시 수정일시    
	private    Integer                 dcsdCnt;     //사망자수         
	private    Integer               injpsnCnt;     //부상자수         
	private    Integer                 swsnCnt;     //중상자수         
	private    Integer                 sijnCnt;     //경상자수         
	private    Integer               injDclCnt;     //부상신고자수       
	private  Timestamp               dmgeInfoCrtDt;     //피해 생성일시
	private  Timestamp             dmgeInfoMdfcnDt;     //피해 수정일시
	private     String                  ctpvCd;     //시도코드         
	private     String                   sggCd;     //시군구코드        
	private     String            acdntLclsfCd;     //사고 대분류 코드    
	private     String            acdntMclsfCd;     //사고 중분류 코드    
	private     String                 acdntCd;     //사고 코드        
	private     String                  vltnCd;     //위반 코드        
	private     String              roadLclsfCd;     //도로 대분류 코드
	private     String                  roadCd;     //도로 코드
	private     String                arVhclCd;     //가해자 차량 코드
	private     String                vmVhclCd;     //피해자 차량 코드    
	private  Timestamp             cdInfoCrtDt;     //코드정보 생성일시    
	private  Timestamp           cdInfoMdfcnDt;     //코드정보 수정일시    
	private     String                  rngCrd;     //위치 좌표
	private     String					  rngX;		//위치 X
	private     String					  rngY;		//위치 Y
	private  Timestamp             rngCrdCrtDt;     //위치 좌표 생성일시
	private  Timestamp           rngCrdMdfcnDt;     //위치 좌표 수정일시   
	private     String               lotLatCrd;     //경도 위도 좌표     
	private  Timestamp          lotLatCrdCrtDt;     //경도 위도 좌표 생성일시
	private  Timestamp        lotLatCrdMdfcnDt;     //경도 위도 좌표 수정일시

	public void setLotLatCrd(String lotLatCrd) {
		this.rngCrd = lotLatCrd;
		rngX = null;
		rngY = null;
		if(rngCrd==null) return;
		String[] buff = rngCrd.split(",");
		if(buff.length>1) {
			rngX = buff[0].trim();
			rngY = buff[1].trim();
		}
	}
}