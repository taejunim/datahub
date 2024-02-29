package net.jcms.framework.security.service;

import java.util.List;
import java.util.Map;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.security.model.UserRole;

public interface UserRoleService extends BaseService<UserRole, UserRole> {

	Integer existCount (UserRole userRole);

	UserRole selectRole(UserRole userRole);

	List<UserRole> selectRoleList(UserRole userRole);
	
	void insert(UserRole userRole);

}
