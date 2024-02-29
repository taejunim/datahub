package net.pm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import net.pm.util.chart.BarChartData;
import net.pm.util.chart.LineChartData;
import net.pm.util.chart.PieChartData;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PmAcdntRcptInfoGraphResponseDto {
    private List<PieChartData> typeStat;
    private List<PieChartData> operatorStat;
    private List<PieChartData> kindStat;
    private List<PieChartData> ageStat;
    private List<PieChartData> genderStat;
    private List<PieChartData> spotPieStat;
    private List<BarChartData> spotBarStat;
    private List<LineChartData> timeStat;
    private List<BarChartData> dowStat;
    private String timeLineChartName;
}
