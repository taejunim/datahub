package net.pm.model;

import lombok.Getter;
import lombok.Setter;
import net.jcms.framework.base.model.BaseModel;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
public class PmAccSearch extends BaseModel {
    private String accType;
    private String location;
    private String pmKind;
    private String gender;
    private Integer age;
    private String company;
    private Timestamp startSearchDt;
    private Timestamp endSearchDt;
}
