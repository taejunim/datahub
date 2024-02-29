package net.pm.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class DataTableDto {

    private List<? extends Object> list;
    private int recordsTotal;
    private int recordsFiltered;

    @Builder
    public DataTableDto(List<? extends Object> list, int total) {
        this.list = list;
        this.recordsTotal = total;
        this.recordsFiltered = total;
    }

}
