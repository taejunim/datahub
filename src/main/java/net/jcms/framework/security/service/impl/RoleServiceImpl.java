package net.jcms.framework.security.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.RoleMapper;
import net.jcms.framework.security.model.Role;
import net.jcms.framework.security.service.RoleService;

@Service(value="roleService")
public class RoleServiceImpl extends BaseServiceImpl<Role, Role, RoleMapper> implements RoleService {

	@Override
	@Resource(name = "roleMapper")
	protected void setMapper(RoleMapper mapper) {
		super.setMapper(mapper);
	}

	@Override
	public Integer existCount(Role role) {
		return mapper.existCount(role);
	}

	
}
