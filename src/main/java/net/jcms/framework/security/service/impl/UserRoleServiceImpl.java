package net.jcms.framework.security.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.UserRoleMapper;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.service.UserRoleService;

@Service(value="userRoleService")
public class UserRoleServiceImpl extends BaseServiceImpl<UserRole, UserRole, UserRoleMapper> implements UserRoleService {

	@Override
	@Resource(name = "userRoleMapper")
	protected void setMapper(UserRoleMapper mapper) {
		super.setMapper(mapper);
	}

	@Override
	public Integer existCount(UserRole userRole) {
		return mapper.existCount(userRole);
	}

	@Override
	public UserRole selectRole(UserRole userRole ) {
		return mapper.selectRole(userRole);
	}

	@Override
	public List<UserRole> selectRoleList(UserRole userRole) {
		return mapper.selectRoleList(userRole);
	}

	@Override
	public void insert(UserRole userRole) {
		super.delete(userRole);
		super.insert(userRole);
	}

}
