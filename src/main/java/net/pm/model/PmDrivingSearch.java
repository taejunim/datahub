package net.pm.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;

@Getter
@Setter
public class PmDrivingSearch extends BaseModel {
    private String operator;
    private String retf;
    private Boolean isIPChecked;
    private Timestamp startSearchDt;
    private Timestamp endSearchDt;
}
