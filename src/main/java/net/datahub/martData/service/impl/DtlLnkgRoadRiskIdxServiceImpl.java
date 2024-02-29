package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.DtlLnkgRoadRiskIdxMapper;
import net.datahub.martData.model.DtlLnkgRoadRiskIdx;
import net.datahub.martData.service.DtlLnkgRoadRiskIdxService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value="dtlLnkgRoadRiskIdxService")
public class DtlLnkgRoadRiskIdxServiceImpl extends BaseServiceImpl<DtlLnkgRoadRiskIdx, DtlLnkgRoadRiskIdx, DtlLnkgRoadRiskIdxMapper> implements DtlLnkgRoadRiskIdxService {
	@Override
	@Resource(name="dtlLnkgRoadRiskIdxMapper")
	protected void setMapper (DtlLnkgRoadRiskIdxMapper mapper) {
		super.setMapper (mapper);
	}

	@Resource(name="dtlLnkgRoadRiskIdxMapper")
	private DtlLnkgRoadRiskIdxMapper dtlLnkgRoadRiskIdxMapper;

	@Override
	public List<String> getDggrGrdKinds() {
		return dtlLnkgRoadRiskIdxMapper.getDggrGrdDistKinds();
	}

}