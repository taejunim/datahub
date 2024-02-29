package net.pm.service.impl;

import net.pm.mapper.*;
import net.pm.model.GInfra;
import net.pm.service.GInfraService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("gInfraService")
public class GInfraServiceImpl implements GInfraService {

    @Resource (name="pmModHBMapper")
    private PmModHBMapper pmModHBMapper;
    @Resource (name="pmSmhMapper")
    private PmSmhMapper pmSmhMapper;
    @Resource (name="pmFisvcFcltMapper")
    private PmFisvcFcltMapper pmFisvcFcltMapper;
    @Resource (name="pmStonMapper")
    private PmStonMapper pmStonMapper;

    @Override
    public List<GInfra> selectPmModHBList() {
        List<GInfra> pmModHBList = pmModHBMapper.selectPmModHBList();
        return pmModHBList;
    }

    @Override
    public List<GInfra> selectPmSmhList() {
        List<GInfra> pmSmhList = pmSmhMapper.selectPmSmhList();
        return pmSmhList;
    }

    @Override
    public List<GInfra> selectPmFisvcFcltList() {
        List<GInfra> pmFisvcFcltList = pmFisvcFcltMapper.selectPmFisvcFcltList();
        return pmFisvcFcltList;
    }

    @Override
    public List<GInfra> selectPmStonList() {
        List<GInfra> pmStonList = pmStonMapper.selectPmStonList();
        return pmStonList;
    }
}
