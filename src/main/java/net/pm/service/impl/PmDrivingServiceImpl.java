package net.pm.service.impl;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.mapper.PmDrivingMapper;
import net.pm.model.PmDrivingSearch;
import net.pm.model.PmLendRtnHstry;
import net.pm.service.PmDrivingService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("pmDrivingService")
public class PmDrivingServiceImpl extends BaseServiceImpl<PmLendRtnHstry, PmDrivingSearch, PmDrivingMapper> implements PmDrivingService {

    @Resource(name="pmDrivingMapper")
    private PmDrivingMapper pmDrivingMapper;

    @Override
    @Resource(name="pmDrivingMapper")
    protected void setMapper (PmDrivingMapper mapper) {
        super.setMapper(mapper);
    }

    @Override
    public List<String> selectOpers() {
        return pmDrivingMapper.selectOpers();
    }

}
