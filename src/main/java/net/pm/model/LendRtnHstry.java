package net.pm.model;

import lombok.Getter;
import lombok.Setter;
import net.datahub.martLendRtnHstry.model.MartLendRtnHstry;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;


@Getter
@Setter
public class LendRtnHstry extends BaseModel {
	private     String                      id;     //아이디
	private     String                    oper;     //운영사
	private     String                  pmType;     //PM 종류
	private     String                   mbrNo;     //회원번호
	private     String                kckbrdId;     //PM ID
	private Timestamp lendDt;     //대여 시간
	private     Double                 spointX;     //대여 경도
	private     Double                 spointY;     //대여 위도
	private     String                rentSpot;     //대여지역
	private Timestamp                   rtnDt;     //반납 시간
	private     Double                 epointX;     //반납 경도
	private     Double                 epointY;     //반납 위도
	private     String              returnSpot;     //반납지역
	private     String                    step;     //불법주차 판별 FLAG
	private    Integer                illePark;     //벌법주차 여부

	static final DateTimeFormatter idForm = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmssSSS");
	static public final SimpleDateFormat sdf = new SimpleDateFormat ("yyyyMMdd-HHmmssSSS");
	static public final String idSplitter = "::";
	public LendRtnHstry() {}
	public LendRtnHstry(MartLendRtnHstry mart, Long idx) {
		this.id = sdf.format(mart.getCrtDt())+idSplitter+idx;
		this.oper = mart.getOperCo();

		if (mart.getKckbrdKd().equals("EB")) {
			this.pmType = "전동자전거";
		} else if (mart.getKckbrdKd().equals("EK")) {
			this.pmType = "전동킥보드";
		} else if (mart.getKckbrdKd().equals("PB")) {
			this.pmType = "공유자전거";
		} else if (mart.getKckbrdKd().equals("ES")) {
			this.pmType = "전동스쿠터";
		}
		this.mbrNo = mart.getMbrNo();
		this.kckbrdId = mart.getKckbrdId();
		this.lendDt = mart.getLendDt();
		Double[] cd = cvtCoord(mart.getLendBrnch());
		if(cd != null) {
			this.spointX = cd[0];
			this.spointY = cd[1];
		}
		this.rtnDt = mart.getRtnDt();
		cd = cvtCoord(mart.getRtnBrnch());
		if(cd != null) {
			this.epointX = cd[0];
			this.epointY = cd[1];
		}
		this.step = "01";
	}

	private static Double[] cvtCoord(String str) {
		if(str==null || str.length()<10) return null;
		String[] sp = str.split(",");
		if(sp.length<2) return null;
		Double[] rst = new Double[2];
		rst[0] = cvtDouble(sp[0]);
		rst[1] = cvtDouble(sp[1]);
		return rst;
	}
	private static Double cvtDouble(String val) {
		try { return Double.parseDouble(val); }
		catch (Exception e) { return null; }
	}
}