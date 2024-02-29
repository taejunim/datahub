package net.datahub.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.GInfra;

import java.util.List;

@Mapper(value = "postgresGInfraMapper")
public interface PostgresGInfraMapper {
    List<GInfra> selectPmModHBList();
    List<GInfra> selectPmPedcrssList();
    List<GInfra> selectPmCrsrdList();
    List<GInfra> selectPmSmhList();
    List<GInfra> selectPmFisvcFcltList();
    List<GInfra> selectPmStonList();
}
