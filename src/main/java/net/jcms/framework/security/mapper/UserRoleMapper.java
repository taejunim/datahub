package net.jcms.framework.security.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.security.model.UserRole;

@Mapper (value="userRoleMapper")
public interface UserRoleMapper extends BaseMapper<UserRole, UserRole>{

	Integer existCount(UserRole userRole);

	UserRole selectRole(UserRole userRole);

	List<UserRole> selectRoleList(UserRole userRole);

}
