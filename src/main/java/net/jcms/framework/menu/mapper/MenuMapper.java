package net.jcms.framework.menu.mapper;
 
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.menu.model.Menu;
import net.jcms.framework.menu.model.MenuSearch;

@Mapper (value="menuMapper")
public interface MenuMapper extends BaseMapper<Menu, MenuSearch> {

	void updateOrder(Menu menu);
	
	List<Menu> selectRoleMenuList(MenuSearch menuSearch);
	
	int selectMaxMenuOrder(MenuSearch menuSearch);
	
}
