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
public class PmLendRtnHstry {
    private String id;
    private String oper;
    private String pm_type;
    private String mbr_no;
    private String kckbrd_id;
    private Timestamp lend_dt;
    private Double spoint_x;
    private Double spoint_y;
    private String rent_spot;
    private Timestamp rtn_dt;
    private Double epoint_x;
    private Double epoint_y;
    private String return_spot;
    private Integer ille_park;
}
