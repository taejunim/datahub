package net.datahub.martData.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.datahub.martData.model.DtlLnkgRoadRiskIdx;
import net.jcms.framework.base.mapper.BaseMapper;

import java.util.List;

@Mapper(value="dtlLnkgRoadRiskIdxMapper")
public interface DtlLnkgRoadRiskIdxMapper extends BaseMapper<DtlLnkgRoadRiskIdx, DtlLnkgRoadRiskIdx> {
    List<String> getDggrGrdDistKinds();
}