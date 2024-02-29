package net.datahub.martTrnsAcdntOcrnBrnch.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.datahub.martTrnsAcdntOcrnBrnch.model.MartTrnsAcdntOcrnBrnch;
import net.jcms.framework.base.mapper.BaseMapper;

import java.util.List;

@Mapper(value="martTrnsAcdntOcrnBrnchMapper")
public interface MartTrnsAcdntOcrnBrnchMapper extends BaseMapper<MartTrnsAcdntOcrnBrnch, MartTrnsAcdntOcrnBrnch> {
    List<MartTrnsAcdntOcrnBrnch> selectOffeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch);
    List<MartTrnsAcdntOcrnBrnch> selectDmgeList(MartTrnsAcdntOcrnBrnch martTrnsAcdntOcrnBrnch);
}
