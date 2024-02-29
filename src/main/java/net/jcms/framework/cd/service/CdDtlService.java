package net.jcms.framework.cd.service;

import java.util.List;
import java.util.Map;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.cd.model.CdDtl;

public interface CdDtlService extends BaseService<CdDtl, CdDtl>{
	
	Integer existCount (CdDtl cdDtl);
	
	Map<String, List<CdDtl>> selectJson();
	
	List<CdDtl> selectJson(String cdId);
	
	void initJson();

	Integer countChek(CdDtl cdDtl);
	
}
