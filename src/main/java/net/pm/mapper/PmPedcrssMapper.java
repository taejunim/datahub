package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmPedcrssMapper")
public interface PmPedcrssMapper {
    int insertPmPedcrss(List<GInfra> pmPedcrssList);
}
