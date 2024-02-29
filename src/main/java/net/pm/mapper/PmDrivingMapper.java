package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.pm.model.PmDrivingSearch;
import net.pm.model.PmLendRtnHstry;

import java.util.List;

@Mapper(value = "pmDrivingMapper")
public interface PmDrivingMapper extends BaseMapper<PmLendRtnHstry, PmDrivingSearch> {
    List<String> selectOpers();

}
