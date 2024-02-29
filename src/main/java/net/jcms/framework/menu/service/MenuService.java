package net.jcms.framework.menu.service;
 
import java.util.List;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.menu.model.Menu;
import net.jcms.framework.menu.model.MenuSearch;

public interface MenuService extends BaseService<Menu, MenuSearch> {

	void updateOrder(Menu menu);
	
	List<Menu> selectJson();
	
	void initJson();
	
	List<Menu> selectRoleMenuList(MenuSearch menuSearch);
	
	List<Menu> selectRoleMenuList(Long uid, boolean refresh);
	
	boolean checkUrlAuth(String url);
	
	void initRoleMenuList();
	
	int selectMaxMenuOrder(MenuSearch menuSearch);
}
