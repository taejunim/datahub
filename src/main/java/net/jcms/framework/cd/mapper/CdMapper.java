package net.jcms.framework.cd.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.cd.model.Cd;

@Mapper (value="cdMapper")
public interface CdMapper extends BaseMapper<Cd, Cd>{
	Integer existCount (Cd cd);
}
