package net.jcms.framework.security.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.security.model.Role;

@Mapper (value="roleMapper")
public interface RoleMapper extends BaseMapper<Role, Role>{

	Integer existCount(Role role);
	

}
