package net.pm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import net.pm.util.chart.BarChartData;
import net.pm.util.chart.BubbleHeatMapData;
import net.pm.util.chart.LineChartData;
import net.pm.util.chart.PieChartData;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class PmLendRtnHstryGraphResponseDto {
    private Boolean isChartStacked;
    private String operatorBarChartBottomCntName;
    private String operatorBarChartTopCntName;
    private String spotBarChartBottomCntName;
    private String spotBarChartTopCntName;
    private String timeLineChartFirstCntName;
    private String timeLineChartSecondCntName;
    private String dowBarChartBottomCntName;
    private String dowBarChartTopCntName;
    private List<BarChartData> operatorStat;
    private List<PieChartData> spotPieStat;
    private List<BarChartData> spotBarStat;
    private List<LineChartData> timeStat;
    private List<BarChartData> kindStat;
    private List<BarChartData> dowStat;
    private List<BubbleHeatMapData> dowTimeStat;
}
