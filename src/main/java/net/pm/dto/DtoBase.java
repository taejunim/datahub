package net.pm.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class DtoBase {
    private Integer start;
    private Integer length;
    private String sort;
    private String sortOrd;
    private Boolean pagingYn;
}
