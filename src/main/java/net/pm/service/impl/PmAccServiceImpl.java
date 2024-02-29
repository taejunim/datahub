package net.pm.service.impl;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.mapper.PmAccMapper;
import net.pm.model.PmAccSearch;
import net.pm.model.PmAcdntRcptInfo;
import net.pm.service.PmAccService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PmAccServiceImpl extends BaseServiceImpl<PmAcdntRcptInfo, PmAccSearch, PmAccMapper> implements PmAccService {

    @Resource(name="pmAccMapper")
    private PmAccMapper pmAccMapper;

    @Override
    @Resource(name="pmAccMapper")
    protected void setMapper (PmAccMapper mapper) {
        super.setMapper(mapper);
    }

    @Override
    public List<String> selectAccTypes() {
        return pmAccMapper.selectAccTypes();
    }
    @Override
    public List<String> selectOpers() {
        return pmAccMapper.selectOpers();
    }
    @Override
    public List<String> selectPmKinds() {
        return pmAccMapper.selectPmKinds();
    }
    @Override
    public List<String> selectSex() {
        return pmAccMapper.selectSex();
    }

    @Override
    public List<String> selectSpot() {
        return pmAccMapper.selectSpot();
    }

}
