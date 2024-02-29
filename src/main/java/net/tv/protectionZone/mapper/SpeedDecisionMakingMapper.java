package net.tv.protectionZone.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.tv.protectionZone.model.SpeedDecisionMaking;

import java.util.List;

/**
 * packageName    : net.tv.protectionZone.mapper
 * fileName       : SpeedDecisionMakingMapper
 * author         : tjlim
 * date           : 2023/06/01
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/01        tjlim       최초 생성
 */
@Mapper(value = "speedDecisionMakingMapper")
public interface SpeedDecisionMakingMapper {

    List<SpeedDecisionMaking> getBarChartData(SpeedDecisionMaking speedDecisionMaking);
    List<SpeedDecisionMaking> getPieChartData(SpeedDecisionMaking speedDecisionMaking);
}
