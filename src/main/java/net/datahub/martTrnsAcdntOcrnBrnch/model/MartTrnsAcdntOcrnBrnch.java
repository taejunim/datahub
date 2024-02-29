package net.datahub.martTrnsAcdntOcrnBrnch.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;
import net.pm.util.chart.BarChartData;

import java.sql.Timestamp;

@Getter
@Setter
public class MartTrnsAcdntOcrnBrnch extends BaseModel implements Comparable<MartTrnsAcdntOcrnBrnch>{
    private     String                      id;     //식별자
    private     String                 datStId;     //데이터셋 식별자
    private Timestamp                   crtDt;     //생성일시
    private Timestamp                 mdfcnDt;     //수정일시
    private     String                  acdntInfoId;     //사고정보 식별자
    private Timestamp             acdntInfoIdCrtDt;     //사고정보 식별자 생성일시
    private Timestamp           acdntInfoIdMdfcnDt;     //사고정보 식별자 수정일시
    private     String               acdntOcrnPstn;     //사고발생위치
    private Timestamp               acdntOcrnPstnCrtDt;     //사고발생위치 생성일시
    private Timestamp             acdntOcrnPstnMdfcnDt;     //사고발생위치 수정일시
    private     String                    spaceNm;     //공간명
    private Timestamp               spaceNmCrtDt;     //공간명 생성일시
    private Timestamp             spaceNmMdfcnDt;     //공간명 수정일시
    private     String             acdntOcrnNo;     //사고발생번호
    private     String             engnCode;     //engn_code
    private     String             acdntOcrnYr;     //사고발생연도
    private     String             acdntOcrnYmd;     //사고발생일자
    private     String             acdntOcrnDdwkCd;     //사고발생요일코드
    private     String             acdntOcrnDdwk;     //사고발생요일
    private     String             danCd;     //주야간코드
    private     String             danSe;     //주야간구분
    private     String             acdntOcrnHrCd;     //사고발생시간코드
    private     String             acdntOcrnHr;     //사고발생시간
    private     String             stdgCd;     //법정동코드
    private     String             stdgNm;     //법정동명
    private     String             acdntTypeLclsfCd;     //사고유형대분류코드
    private     String             acdntTypeLclsf;     //사고유형대분류
    private     String             acdntTypeSclsfCd;     //사고유형소분류코드
    private     String             acdntTypeSclsf;       //사고유형소분류
    private     String             acdntTypeCd;          //사고유형코드
    private     String             acdntTypeDtl;         //사고유형세부
    private     String             rgVltnCd;             //법규위반코드
    private     String             rgVltn;               //법규위반
    private     Double             acdntOcrnPstnXcrd;    //사고발생위치 x좌표
    private     Double             acdntOcrnPstnYcrd;    //사고발생위치 y좌표
    private     String             wetrSttsCd;           //기상상태코드
    private     String             wetrStts;             //기상상태
    private     String             roadStleCd;           //도로형태코드
    private     String             roadStle;             //도로형태
    private     String             hhdgwAt;              //hhdgw_at
    private     String             wodDgeCd;             //상해정도코드
    private     String             wodDge;               //상해정도
    private     Integer            dcsdCnt;              //사망자수
    private     Integer            swsnCnt;              //중상자수
    private     Integer            sijnCnt;              //경상자수
    private     Integer            injDclCnt;            //부상신고자수
    private     String             offeVhclCamdlLclsfCd; //가해차량 차종대분류코드
    private     String             offeVhclCamdlLclsf;   //가해차량 차종대분류
    private     String             offeVhclCamdl;        //가해차량 차종
    private     String             arWodDgeLclsfCd;      //가해차상해정도대분류코드
    private     String             arWodDgeLclsf;      //가해차상해정도대분류
    private     String             arWodDgeClsfCd;       //가해차상해정도분류코드
    private     String             arWodDgeClsf;       //가해차상해정도분류
    private     String             arAgeCd;            //가해자연령코드
    private     String             arAge;               //가해자연령
    private     String             arSexdCd;            //가해자성별코드
    private     String             arSexd;            //가해자성별
    private     String             dmgeVhclCamdlLclsfCd; //피해차량 차종대분류코드
    private     String             dmgeVhclCamdlLclsf;  // 피해차량 차종대분류
    private     String             dmgeVhclCarmdlCd;    //피해차량 차종코드
    private     String             dmgeVhclCarmdl;    //피해차량 차종
    private     String             vmWodDgeLclsfCd;   //피해차상해정도대분류코드
    private     String             vmWodDgeLclsf;   //피해차상해정도대분류
    private     String             vmWodDgeClsfCd;   //피해차상해정도분류코드
    private     String             vmWodDgeClsf;    //피해자상해정도분류
    private     String             vmAgeCd;         //피해자연령코드
    private     String             vmAge;           //피해자연령
    private     String             vmSexdCd;        //피해자성별코드
    private     String             vmSexd;          //피해자성별
    private     String             sptOtlnmapAt;    //spt_otlnmap_at
    private     String             rdseSttsCd;      //노면상태코드
    private     String             rdseStts;        //노면상태
    private     String             acdntOcrnPlc;    //사고발생장소
    private     String             acdntExpln;      //사고설명
    private     String             roadDiv;         //road_div
    private     String             roadNo;          //도로번호
    private     String             roadNm;          //도로명
    private     String             otnAcdntNo;      //otn_acdnt_no
    private     String             polStaCode;      //pol_sta_code
    private     String             ootSeCd;         //시내외구분코드
    private     String             ootSe;           //시내외구분
    private     String             accClsPartcarea; //acc_cls_partcarea
    private     String             polAcdntNo;      //pol_acdnt_no
    private     String             selFcr;          //sel_fcr
    private     String             roadType;        //road_type
    private     String             intndncId;       //intndnc_id
    private     String             officeId;        //officeId
    private     String             moctLinkId;      //moct_link_id
    private     String             acdntFrmLv1;     //acdnt_frm_lv1
    private     String             acdntFrmLv2;     //acdnt_frm_lv2
    private     String             acdntFrmLv3;     //acdnt_frm_lv3
    private     String             acdntStaLv1;     //acdnt_sta_lv1
    private     String             acdntStaLv2;     //acdnt_sta_lv2
    private     String             cd069;           //cd_069
    private     String             arWodPtCd;       //가해자상해부위코드
    private     String             arWodPt;         //가해자상해부위
    private     String             vmWodPtCd;       //피해자상해부위코드
    private     String             vmWodPt;         //피해자상해부위
    private     String             frstRgtrId;      //최초등록자아이디
    private     String             frstRegDt;       //최초등록일시
    private     String             lastReneId;      //최종갱신자아이디
    private     String             lastUpdtDt;      //최종갱신일시
    private     String             accCls;          //acc_cls
    private  Timestamp             dtlDatCrtDt;     //세부데이터 생성일시
    private  Timestamp             dtlDatMdfcnDt;   //세부데이터 수정일시

    // custom property
    private     String                 accKindCd;   //가해자 피해자 구분 코드 (가해자: 01, 피해자: 02)


    @Override
    public int compareTo(MartTrnsAcdntOcrnBrnch other) {
        return this.crtDt.compareTo(other.getCrtDt());
    }
}
