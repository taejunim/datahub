package net.jcms.framework.weblog.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.weblog.mapper.WebLogMapper;
import net.jcms.framework.weblog.model.WebLog;
import net.jcms.framework.weblog.model.WebLogSearch;
import net.jcms.framework.weblog.service.WebLogService;

@Service(value="webLogService")
public class WebLogServiceImpl extends BaseServiceImpl<WebLog, WebLogSearch, WebLogMapper> implements WebLogService {

	@Override
	@Resource (name="webLogMapper")
	protected void setMapper (WebLogMapper mapper) {
		super.setMapper (mapper);
	}
}
