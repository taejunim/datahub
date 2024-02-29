package net.jcms.framework.weblog.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.weblog.model.WebLog;
import net.jcms.framework.weblog.model.WebLogSearch;

@Mapper (value="webLogMapper")
public interface WebLogMapper extends BaseMapper<WebLog, WebLogSearch> {
	
}
