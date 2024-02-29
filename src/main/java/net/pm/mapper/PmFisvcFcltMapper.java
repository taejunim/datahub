package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "pmFisvcFcltMapper")
public interface PmFisvcFcltMapper {
    int insertPmFisvcFclt(List<GInfra> pmFisvcFcltList);
    List<GInfra> selectPmFisvcFcltList();
}
