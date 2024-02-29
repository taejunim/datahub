package net.datahub.martData.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;


@Getter
@Setter
public class DtlLnkgRoadRiskIdx extends BaseModel {
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private  Timestamp                 mdfcnDt;     //수정일시         
	private     String                   datSn;     //데이터 순번       
	private  Timestamp              datSnCrtDt;     //데이터 순번 생성일시  
	private  Timestamp            datSnMdfcnDt;     //데이터 순번 수정일시  
	private     String                 sctnCrd;     //구간좌표         
	private  Timestamp            sctnCrdCrtDt;     //구간좌표 생성일시    
	private  Timestamp          sctnCrdMdfcnDt;     //구간좌표 수정일시    
	private     String                 dggrIdx;     //위험도지수        
	private  Timestamp            dggrIdxCrtDt;     //위험도지수 생성일시   
	private  Timestamp          dggrIdxMdfcnDt;     //위험도지수 수정일시   
	private     String                 dggrGrd;     //위험도등급        
	private  Timestamp            dggrGrdCrtDt;     //위험도등급 생성일시   
	private  Timestamp          dggrGrdMdfcnDt;     //위험도등급 수정일시

	public String getLine_string() {
		if(sctnCrd==null) return null;
		String rst = sctnCrd.replaceAll("],\\[", "@");
		rst = rst.replaceAll("\\[\\[\\[", "(")
				.replaceAll("]]]", ")")
				.replaceAll(",", " ")
				.replaceAll("@", ", ");
		return rst;
	}

//	public Integer getAnals_value() {
//		return
//	}
//	private String anals_grid;
}