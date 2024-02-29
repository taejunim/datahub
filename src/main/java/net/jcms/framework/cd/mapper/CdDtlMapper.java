package net.jcms.framework.cd.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.cd.model.CdDtl;

@Mapper (value="cdDtlMapper")
public interface CdDtlMapper extends BaseMapper<CdDtl, CdDtl>{
	Integer existCount (CdDtl cdDtl);

	Integer countChek(CdDtl cdDtl);
}
