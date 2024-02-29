package net.pm.model;

import lombok.Getter;
import lombok.Setter;
import net.datahub.martAcdntRcptInfo.model.MartAcdntRcptInfo;
import net.datahub.martTrnsAcdntOcrnBrnch.model.MartTrnsAcdntOcrnBrnch;
import net.jcms.framework.base.model.BaseModel;
import org.osgeo.proj4j.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;


@Getter
@Setter
public class AcdntRcptInfo extends BaseModel {
	static final DateTimeFormatter idForm = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmssSSS");
	static public final SimpleDateFormat sdf = new SimpleDateFormat ("yyyyMMdd-HHmmssSSS");
	static public final String idSplitter = "::";

	private     String                      id;     //아이디
	private String datStId;        //데이터셋 식별자
	private     String                  operCo;     //운영사
	private     String                  pmType;     //PM 종류
	private     String                    sexd;     //성별
	private     String                    age;     //나이
	private Timestamp acdntOcrnDt;     //사고일시
	private     String            acdntOcrnPlc;     //사고장소
	private     String               acdntType;     //사고구분
	private     String                 acdntCn;     //상세내용
	private     Double                  acdntX;     //사고 경도
	private     Double                  acdntY;     //사고 위도
	private     String               acdntSpot;     //사고지역

	public AcdntRcptInfo() {}

	public AcdntRcptInfo(MartAcdntRcptInfo mart, long idx) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate acdntDate = strToTimestmp(mart.getAcdntOcrnDt()).toLocalDateTime().toLocalDate();

		if (mart.getBrdt().equals("-") || mart.getBrdt() == null) {
			this.age = "-";
		} else {
			LocalDate birthDate = LocalDate.parse(mart.getBrdt(), formatter);

			Period period = Period.between(birthDate, acdntDate);
			this.age = String.valueOf(period.getYears());
		}

		this.id = sdf.format(mart.getCrtDt())+idSplitter+idx;
		this.datStId = mart.getDatStId();
		this.operCo = mart.getOperCo();
		this.sexd = mart.getSexd();
		if(mart.getAcdntOcrnDt()!=null) this.acdntOcrnDt = strToTimestmp(mart.getAcdntOcrnDt());
		this.acdntOcrnPlc = mart.getAcdntOcrnPlc();
		this.acdntType = mart.getAcdntType();
		this.acdntCn = mart.getAcdntCn();
	}

	public AcdntRcptInfo(MartTrnsAcdntOcrnBrnch mart, long idx) {
		DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy년M월d일", Locale.KOREAN);

		ProjCoordinate coordinate5179 = new ProjCoordinate(mart.getAcdntOcrnPstnXcrd(), mart.getAcdntOcrnPstnYcrd());

		CRSFactory crsFactory = new CRSFactory();
		CoordinateReferenceSystem crs5179 = crsFactory.createFromName("EPSG:5179");
		CoordinateReferenceSystem crs4326 = crsFactory.createFromName("EPSG:4326");

		CoordinateTransformFactory transformFactory = new CoordinateTransformFactory();

		CoordinateTransform transform = transformFactory.createTransform(crs5179, crs4326);

		ProjCoordinate coordinate4326 = new ProjCoordinate();
		transform.transform(coordinate5179, coordinate4326);

		this.acdntX = coordinate4326.x;
		this.acdntY = coordinate4326.y;

		if (mart.getAccKindCd().equals("01")) { // 가해자
			if (mart.getArSexdCd().equals("1")) {
				this.sexd = "남성";
			} else if (mart.getArSexdCd().equals("2")) {
				this.sexd = "여성";
			}
			this.age = Integer.parseInt(mart.getArAgeCd()) > 200 ? null : mart.getArAgeCd();
		} else if (mart.getAccKindCd().equals("02")) { // 피해자
			if (mart.getVmSexdCd().equals("1")) {
				this.sexd = "남성";
			} else if (mart.getVmSexdCd().equals("2")) {
				this.sexd = "여성";
			}
			this.age = Integer.parseInt(mart.getVmAgeCd()) > 200 ? null : mart.getVmAgeCd();
		}

		this.id = sdf.format(mart.getCrtDt())+idSplitter+idx;
		this.datStId = mart.getDatStId();
		this.operCo = null;
		this.acdntOcrnPlc = mart.getAcdntOcrnPlc();
		this.acdntType = mart.getAcdntTypeSclsf();
		this.acdntCn = mart.getAcdntExpln();
		this.acdntOcrnDt = Timestamp.valueOf(LocalDate.parse(mart.getAcdntOcrnYmd().replaceAll("\\s+", ""), formatter2).atStartOfDay());
	}

	static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	private static Timestamp strToTimestmp(String str) {
		if(str == null) return null;
		try {
			Date stringToDate = dateFormat.parse(str);
			return new Timestamp(stringToDate.getTime());

		} catch (Exception e) {
			return null;
		}
	}
}