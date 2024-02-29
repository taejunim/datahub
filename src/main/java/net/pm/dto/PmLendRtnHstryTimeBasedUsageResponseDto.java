package net.pm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import net.pm.model.PmLendRtnHstry;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class PmLendRtnHstryTimeBasedUsageResponseDto {
    private Map<Integer, List<PmLendRtnHstry>> rentTimeMap;
}
