package net.jcms.framework.menu.service.impl;

import net.jcms.framework.menu.mapper.MenuConnHistMapper;
import net.jcms.framework.menu.model.MenuConnHist;
import net.jcms.framework.menu.model.MenuConnHistSearch;
import net.jcms.framework.menu.service.MenuConnHistService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value="cmsMenuConnHistService")
public class MenuConnHistServiceImpl extends BaseServiceImpl<MenuConnHist, MenuConnHistSearch, MenuConnHistMapper> implements MenuConnHistService {

	@Override
	@Resource (name="cmsMenuConnHistMapper")
	protected void setMapper (MenuConnHistMapper mapper) {
		super.setMapper (mapper);
	}

	@Override
	public List<MenuConnHistSearch> siteStats(
			MenuConnHistSearch menuConnHistSearch) {
		return mapper.siteStats (menuConnHistSearch);
	}
	
}
