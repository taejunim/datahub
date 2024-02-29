package net.jcms.framework.security.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.ScurRscRoleMapper;
import net.jcms.framework.security.model.ScurRscRole;
import net.jcms.framework.security.service.ScurRscRoleService;

@Service(value="scurRscRoleService")
public class ScurRscRoleServiceImpl extends BaseServiceImpl<ScurRscRole, ScurRscRole, ScurRscRoleMapper> implements ScurRscRoleService{

		@Override
		@Resource (name="scurRscRoleMapper")
		protected void setMapper (ScurRscRoleMapper mapper) {
			super.setMapper(mapper);
		}
	
}