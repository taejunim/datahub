package net.jcms.framework.menu.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.menu.model.MenuConnHist;
import net.jcms.framework.menu.model.MenuConnHistSearch;
import net.jcms.framework.base.mapper.BaseMapper;

import java.util.List;

@Mapper (value="cmsMenuConnHistMapper")
public interface MenuConnHistMapper extends BaseMapper<MenuConnHist, MenuConnHistSearch> {

	List<MenuConnHistSearch> siteStats(MenuConnHistSearch menuConnHistSearch);
	
}
