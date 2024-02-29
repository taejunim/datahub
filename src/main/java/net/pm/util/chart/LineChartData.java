package net.pm.util.chart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LineChartData implements Comparable<LineChartData>{
    private Integer firstCnt; // rent
    private Integer secondCnt; // return
    private Integer totalCnt;
    private String x;

    @Override
    public int compareTo(LineChartData other) throws NumberFormatException {
        return Integer.compare(Integer.parseInt(this.x), Integer.parseInt(other.x));
    }
}
