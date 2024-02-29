package net.datahub.martTrnsAcdntOcrnBrnch.service;

import net.datahub.martTrnsAcdntOcrnBrnch.model.MartTrnsAcdntOcrnBrnch;
import net.jcms.framework.base.service.BaseService;

import java.util.List;

public interface MartTrnsAcdntOcrnBrnchService extends BaseService<MartTrnsAcdntOcrnBrnch, MartTrnsAcdntOcrnBrnch> {

    List<MartTrnsAcdntOcrnBrnch> selectOffeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch);
    List<MartTrnsAcdntOcrnBrnch> selectDmgeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch);
}
