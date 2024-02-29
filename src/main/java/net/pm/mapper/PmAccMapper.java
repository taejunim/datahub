package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.pm.model.PmAccSearch;
import net.pm.model.PmAcdntRcptInfo;

import java.util.List;

@Mapper(value = "pmAccMapper")
public interface PmAccMapper extends BaseMapper<PmAcdntRcptInfo, PmAccSearch> {
    List<String> selectAccTypes();
    List<String> selectOpers();
    List<String> selectPmKinds();
    List<String> selectSex();
    List<String> selectSpot();
}
