package net.pm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class PmAcdntRcptInfoRequestDto extends DtoBase {
    private String accType;
    private String location;
    private String pmKind;
    private String gender;
    private Integer age;
    private String company;
    private Timestamp startSearchDt;
    private Timestamp endSearchDt;
}
