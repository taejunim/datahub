package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmModHBMapper")
public interface PmModHBMapper {
    int insertPmModHB(List<GInfra> pmModHBList);
    List<GInfra> selectPmModHBList();
}
