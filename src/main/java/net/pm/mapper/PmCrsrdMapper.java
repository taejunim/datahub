package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmCrsrdMapper")
public interface PmCrsrdMapper {
    int insertPmCrsrd(List<GInfra> pmCrsrdList);
}
