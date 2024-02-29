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
public class PmLendRtnHstryRequestDto extends DtoBase {
    private String operator;
    private String retf;
    private Boolean isIPChecked;
    private Timestamp startSearchDt;
    private Timestamp endSearchDt;
}
