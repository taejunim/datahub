package net.tv.protectionZone.service.impl;

import net.tv.protectionZone.mapper.SpeedDecisionMakingMapper;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.protectionZone.service.SpeedDecisionMakingService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * packageName    : net.tv.protectionZone.service.impl
 * fileName       : SpeedDecisionMakingServiceImpl
 * author         : tjlim
 * date           : 2023/06/01
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/01        tjlim       최초 생성
 */
@Service
public class SpeedDecisionMakingServiceImpl implements SpeedDecisionMakingService {

    @Resource(name="speedDecisionMakingMapper")
    private SpeedDecisionMakingMapper speedDecisionMakingMapper;

    @Override
    public Map<String,Object> getChartData(SpeedDecisionMaking speedDecisionMaking) {

        Map<String, Object> result = new HashMap<String, Object>();

        speedDecisionMaking.setType("timeZoneCode");
        result.put("barChartDataByTimeZoneCode", speedDecisionMakingMapper.getBarChartData(speedDecisionMaking));
        result.put("pieChartDataByTimeZoneCode", speedDecisionMakingMapper.getPieChartData(speedDecisionMaking));

        speedDecisionMaking.setType("gender");
        result.put("barChartDataByGender", speedDecisionMakingMapper.getBarChartData(speedDecisionMaking));
        result.put("pieChartDataByGender", speedDecisionMakingMapper.getPieChartData(speedDecisionMaking));

        return result;
    }
}
