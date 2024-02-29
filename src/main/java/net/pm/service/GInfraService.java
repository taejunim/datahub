package net.pm.service;

import net.pm.model.GInfra;

import java.util.List;

public interface GInfraService {
    List<GInfra> selectPmModHBList();
    List<GInfra> selectPmSmhList();
    List<GInfra> selectPmFisvcFcltList();
    List<GInfra> selectPmStonList();
}
