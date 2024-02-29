package net.jcms.framework.cd.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.cd.mapper.CdDtlMapper;
import net.jcms.framework.cd.model.Cd;
import net.jcms.framework.cd.model.CdDtl;
import net.jcms.framework.cd.service.CdDtlService;
import net.jcms.framework.cd.service.CdService;
import net.jcms.framework.util.ApplicationHelper;


@Service(value="cdDtlService")
public class CdDtlServiceImpl extends BaseServiceImpl<CdDtl, CdDtl, CdDtlMapper>  implements CdDtlService {
	
	@Resource (name="cdService")
	private CdService cdService;
	
	@Override
	@Resource (name="cdDtlMapper")
	protected void setMapper (CdDtlMapper mapper) {
		super.setMapper(mapper);
	}

	@Override
	public Integer existCount(CdDtl cdDtl) {
		return mapper.existCount(cdDtl);
	}
	
	@Override
	public Map<String, List<CdDtl>> selectJson() {
		if(ApplicationHelper.cdDtlMap == null) {
			initJson();
		}
		return ApplicationHelper.cdDtlMap;
	}
	
	@Override
	public List<CdDtl> selectJson(String cdId) {
		Map<String, List<CdDtl> > cdDtlMap = selectJson();
		return cdDtlMap.get(cdId);
	}

	@Override
	public void initJson() {
		Map<String, List<CdDtl>> cdDtlMap = new HashMap<String, List<CdDtl>>();
		Cd cdSearch = new Cd();
		CdDtl cdDtl;
		List<Cd> cdList = cdService.selectList(cdSearch);
		for(Cd cd : cdList) {
			cdDtl = new CdDtl();
			cdDtl.setCdId(cd.getCdId());
			cdDtl.setSort("CD_DTL_ORDER");
			cdDtlMap.put(cd.getCdId(), selectList(cdDtl));
		}
		ApplicationHelper.cdDtlMap = cdDtlMap;
	}

	@Override
	public Integer countChek(CdDtl cdDtl) {
		return mapper.countChek(cdDtl);
	}

}
