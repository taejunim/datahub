package net.pm.util.chart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BarChartData implements Comparable<BarChartData>{
    private String name;
    private Integer totalCnt;
    private Integer topCnt;
    private Integer bottomCnt;

    @Override
    public int compareTo(BarChartData other) {
        return Integer.compare(this.totalCnt, other.totalCnt);
    }
}
