package net.datahub.martTrnsAcdntOcrnBrnch.service.impl;

import net.datahub.martTrnsAcdntOcrnBrnch.mapper.MartTrnsAcdntOcrnBrnchMapper;
import net.datahub.martTrnsAcdntOcrnBrnch.model.MartTrnsAcdntOcrnBrnch;
import net.datahub.martTrnsAcdntOcrnBrnch.service.MartTrnsAcdntOcrnBrnchService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value="martTrnsAcdntOcrnBrnchService")
public class MartTrnsAcdntOcrnBrnchServiceImpl extends BaseServiceImpl<MartTrnsAcdntOcrnBrnch, MartTrnsAcdntOcrnBrnch, MartTrnsAcdntOcrnBrnchMapper> implements MartTrnsAcdntOcrnBrnchService {

    @Resource (name="martTrnsAcdntOcrnBrnchMapper")
    private MartTrnsAcdntOcrnBrnchMapper martTrnsAcdntOcrnBrnchMapper;

    @Override
    @Resource(name="martTrnsAcdntOcrnBrnchMapper")
    protected void setMapper (MartTrnsAcdntOcrnBrnchMapper mapper) {
        super.setMapper (mapper);
    }

    public List<MartTrnsAcdntOcrnBrnch> selectOffeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch) {
        return martTrnsAcdntOcrnBrnchMapper.selectOffeList(martTrnsAcdntOcrnBrnch);
    }

    public List<MartTrnsAcdntOcrnBrnch> selectDmgeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch) {
        return martTrnsAcdntOcrnBrnchMapper.selectDmgeList(martTrnsAcdntOcrnBrnch);
    }
}
