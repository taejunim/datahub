package net.datahub.martData.service;

import net.datahub.martData.mapper.DtlLnkgRoadRiskIdxMapper;
import net.datahub.martData.model.DtlLnkgRoadRiskIdx;
import net.jcms.framework.base.service.BaseService;

import javax.annotation.Resource;
import java.util.List;

public interface DtlLnkgRoadRiskIdxService extends BaseService<DtlLnkgRoadRiskIdx, DtlLnkgRoadRiskIdx> {
    List<String> getDggrGrdKinds();
}