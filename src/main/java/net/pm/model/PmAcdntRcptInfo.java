package net.pm.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Getter
@Setter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
public class PmAcdntRcptInfo {
    private String id;
    private String data_st_id;
    private String oper_co;
    private String pm_type;
    private String sexd;
    private String age;
    private Timestamp acdnt_ocrn_dt;
    private String acdnt_ocrn_plc;
    private String acdnt_type;
    private String acdnt_cn;
    private Double acdnt_x;
    private Double acdnt_y;
    private String acdnt_spot;
}
