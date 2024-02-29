package net.datahub.martAcdntRcptInfo.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;


@Getter
@Setter
public class MartAcdntRcptInfo extends BaseModel {
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private Timestamp                 mdfcnDt;     //수정일시         
	private     String                  operCo;     //운영회사         
	private Timestamp             operCoCrtDt;     //운영회사 생성일시    
	private Timestamp           operCoMdfcnDt;     //운영회사 수정일시    
	private     String                    sexd;     //성별           
	private Timestamp               sexdCrtDt;     //성별 생성일시      
	private Timestamp sexdMdfcnDt;     //성별 수정일시
	private     String                    brdt;     //생년월일         
	private Timestamp               brdtCrtDt;     //생년월일 생성일시    
	private Timestamp             brdtMdfcnDt;     //생년월일 수정일시    
	private     String             acdntOcrnDt;     //사고발생일시       
	private Timestamp        acdntOcrnDtCrtDt;     //사고발생일시 생성일시  
	private Timestamp      acdntOcrnDtMdfcnDt;     //사고발생일시 수정일시  
	private     String            acdntOcrnPlc;     //사고발생장소       
	private Timestamp       acdntOcrnPlcCrtDt;     //사고발생장소 생성일시  
	private Timestamp     acdntOcrnPlcMdfcnDt;     //사고발생장소 수정일시  
	private     String               acdntType;     //사고유형         
	private Timestamp          acdntTypeCrtDt;     //사고유형 생성일시    
	private Timestamp        acdntTypeMdfcnDt;     //사고유형 수정일시    
	private     String                 acdntCn;     //사고내용         
	private Timestamp            acdntCnCrtDt;     //사고내용 생성일시    
	private Timestamp          acdntCnMdfcnDt;     //사고내용 수정일시    
}