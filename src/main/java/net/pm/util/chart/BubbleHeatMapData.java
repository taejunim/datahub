package net.pm.util.chart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BubbleHeatMapData {
    private String hour;
    private String weekday;
    private Integer value;
}
