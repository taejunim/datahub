package net.tv.protectionZone.service;

import net.tv.protectionZone.model.SpeedDecisionMaking;

import java.util.Map;

/**
 * packageName    : net.tv.protectionZone.service
 * fileName       : SpeedDecisionMakingService
 * author         : tjlim
 * date           : 2023/06/01
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/01        tjlim       최초 생성
 */
public interface SpeedDecisionMakingService {
    Map<String, Object> getChartData(SpeedDecisionMaking speedDecisionMaking);
}
