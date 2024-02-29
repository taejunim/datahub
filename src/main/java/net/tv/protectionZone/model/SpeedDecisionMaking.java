package net.tv.protectionZone.model;

import lombok.Data;

import java.util.List;

/**
 * packageName    : net.tv.protectionZone.model
 * fileName       : SpeedDecisionMaking
 * author         : tjlim
 * date           : 2023/06/01
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/01        tjlim       최초 생성
 */
@Data
public class SpeedDecisionMaking {
    public String speed;
    public String speedCount;
    public String trafficTime;
    public String trafficCount;
    public int pedestrianCount;
    public String startDate;
    public String endDate;
    public int minValue;
    public int maxValue;
    public String period;

    public String baseDate;
    public String type;
    public String populationTraffic;

    public String max;
    public String avg;
    public String min;
    public String miss;

    public List<String> cellId;
    public String selectedCoordinates;
}
