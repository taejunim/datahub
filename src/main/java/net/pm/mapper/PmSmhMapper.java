package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmSmhMapper")
public interface PmSmhMapper {
    int insertPmSmh(List<GInfra> pmSmhList);
    List<GInfra> selectPmSmhList();
}
