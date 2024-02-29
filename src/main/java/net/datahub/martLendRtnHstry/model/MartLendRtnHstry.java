package net.datahub.martLendRtnHstry.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;


@Getter
@Setter
public class MartLendRtnHstry extends BaseModel {
	private     String                      id;     //식별자          
	private     String                 datStId;     //데이터셋 식별자     
	private Timestamp crtDt;     //생성일시
	private Timestamp                 mdfcnDt;     //수정일시         
	private     String                   mbrNo;     //회원번호         
	private Timestamp              mbrNoCrtDt;     //회원번호 생성일시    
	private Timestamp            mbrNoMdfcnDt;     //회원번호 수정일시    
	private     String                kckbrdId;     //킥보드 식별자      
	private Timestamp           kckbrdIdCrtDt;     //킥보드 식별자 생성일시 
	private Timestamp         kckbrdIdMdfcnDt;     //킥보드 식별자 수정일시 
	private     String               lendBrnch;     //대여지점         
	private Timestamp          lendBrnchCrtDt;     //대여지점 생성일시    
	private Timestamp        lendBrnchMdfcnDt;     //대여지점 수정일시    
	private     String                rtnBrnch;     //반납지점         
	private Timestamp           rtnBrnchCrtDt;     //반납지점 생성일시    
	private Timestamp         rtnBrnchMdfcnDt;     //반납지점 수정일시    
	private Timestamp                  lendDt;     //대여일시         
	private Timestamp                   rtnDt;     //반납일시         
	private Timestamp         lendRtnDatCrtDt;    //대여 반납 데이터 생성일시
	private Timestamp       lendRtnDatMdfcnDt;    //대여 반납 데이터 수정일시
	private 	String				   operCo;    //운영회사
	private Timestamp         	  operCoCrtDt;    //운영회사 생성일시
	private Timestamp       	operCoMdfcnDt;    //운영회사 수정일시
	private 	String				 kckbrdKd;    //킥보드 종류
	private Timestamp         	kckbrdKdCrtDt;    //킥보드 종류 생성일시
	private Timestamp         kckbrdKdMdfcnDt;    //킥보드 종류 수정일시
}