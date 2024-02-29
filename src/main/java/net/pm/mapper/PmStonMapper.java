package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmStonMapper")
public interface PmStonMapper {
    int insertPmSton(List<GInfra> pmStonList);
    List<GInfra> selectPmStonList();
}
