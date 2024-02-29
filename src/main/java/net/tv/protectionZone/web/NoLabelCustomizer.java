package net.tv.protectionZone.web;

import net.sf.jasperreports.engine.JRChart;
import net.sf.jasperreports.engine.JRChartCustomizer;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.block.BlockBorder;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.title.LegendTitle;

import java.text.DecimalFormat;
import java.text.NumberFormat;

/**
 * packageName    : net.tv.protectionZone.web
 * fileName       : NoLabelCustomizer
 * author         : tjlim
 * date           : 2023/06/07
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/07        tjlim       최초 생성
 */
public class NoLabelCustomizer implements JRChartCustomizer {
    @Override
    public void customize(JFreeChart chart, JRChart jrchart) {
        PiePlot plot = (PiePlot) chart.getPlot();
        plot.setLabelOutlinePaint(null);
        plot.setLabelShadowPaint(null);

        StandardPieSectionLabelGenerator standardPieSectionLabelGenerator = new StandardPieSectionLabelGenerator(
                "{2}",
                new DecimalFormat(""),
                new DecimalFormat("0.00%"));
        plot.setLabelGenerator(standardPieSectionLabelGenerator);

        LegendTitle legendTitle = chart.getLegend();
        if (legendTitle != null) {
            legendTitle.setFrame(BlockBorder.NONE);
        }
    }
}
