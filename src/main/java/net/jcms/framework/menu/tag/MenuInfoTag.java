package net.jcms.framework.menu.tag;
 
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspWriter;

import net.jcms.framework.base.tag.BaseTag;
import net.jcms.framework.menu.model.Menu;
import net.jcms.framework.menu.service.MenuService;
import net.jcms.framework.util.StrUtil;

public class MenuInfoTag extends BaseTag{

	private MenuService menuService;
	private Long currentMenuId = null;
	
	@Override
	protected int doProcessTag() throws IOException {
		menuService = getRequestContext().getWebApplicationContext().getBean(MenuService.class);
		
		JspWriter out = pageContext.getOut ();
		StringBuffer sb = new StringBuffer();
		currentMenuId = null;
		
		HttpServletRequest request = (HttpServletRequest) this.pageContext.getRequest();
		HttpSession session = request.getSession();
		//현재 접속한 메뉴번호를 구한다.
		if(request.getParameter("currentMenuId") != null) {
			currentMenuId = Long.parseLong(this.pageContext.getRequest().getParameter("currentMenuId"));
			session.setAttribute("currentMenuId", currentMenuId);
		}else {
			currentMenuId = (Long) session.getAttribute("currentMenuId");
		}
		if(currentMenuId != null) {
			List<Menu> menuList = menuService.selectJson();
			Menu currentMenu = null;
			for(Menu menu : menuList) {
				currentMenu = getMenu(menu);
				if(currentMenu != null) break;
			}
			if(currentMenu != null) {
				sb.append("<h4 class='contentsTit'>"+currentMenu.getMenuNm()+"</h4>");
				sb.append("<div class='location'><ul class='clear-fix'>");
				sb.append("<li class='home'><a>홈</a></li>");
				sb.append(makeUpperCourse(currentMenu));
				sb.append("</ul> </div>");
			}
		}
		out.print(sb.toString());
		return SKIP_BODY;
	}

	public Menu getMenu(Menu menu) {
		Menu result = null;
		if(menu.getMenuId().compareTo(currentMenuId) == 0) {
			return menu;
		}
		
		for(Menu childMenu : menu.childList) {
			result = getMenu(childMenu);
			if(result != null) return result;
		}
		return result;
	}
	
	public String makeUpperCourse(Menu menu) {
		String result = "";
		if(menu.getUpperMenuId() != null) result += makeUpperCourse(menu.getUpperMenu());
		result += "<li><a>";
		result += menu.getMenuNm()+"</a></li>";
		return result;
	}
}
