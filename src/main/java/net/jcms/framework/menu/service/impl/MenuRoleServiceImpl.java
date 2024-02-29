package net.jcms.framework.menu.service.impl;
 
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.menu.mapper.MenuRoleMapper;
import net.jcms.framework.menu.model.MenuRole;
import net.jcms.framework.menu.model.MenuRoleSearch;
import net.jcms.framework.menu.service.MenuRoleService;

@Service(value="menuRoleService")
public class MenuRoleServiceImpl extends BaseServiceImpl<MenuRole, MenuRoleSearch, MenuRoleMapper> implements MenuRoleService {

	@Override
	@Resource (name="menuRoleMapper")
	protected void setMapper (MenuRoleMapper mapper) {
		super.setMapper (mapper);
	}
	
}
