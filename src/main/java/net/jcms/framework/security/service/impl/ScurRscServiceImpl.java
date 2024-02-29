package net.jcms.framework.security.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.ScurRscMapper;
import net.jcms.framework.security.model.ScurRsc;
import net.jcms.framework.security.service.ScurRscService;

@Service(value="scurRscService")
public class ScurRscServiceImpl extends BaseServiceImpl<ScurRsc, ScurRsc, ScurRscMapper> implements ScurRscService{

		@Override
		@Resource (name="scurRscMapper")
		protected void setMapper (ScurRscMapper mapper) {
			super.setMapper(mapper);
		}
	
}