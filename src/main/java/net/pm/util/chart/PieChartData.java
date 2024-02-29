package net.pm.util.chart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PieChartData implements Comparable<PieChartData>{
    private String name;
    private Integer value;   // general, total
    private Integer value1;  // rent
    private Integer value2;  // return

    @Override
    public int compareTo(PieChartData other) {
        return Integer.compare(this.value, other.value);
    }
}
