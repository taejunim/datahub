package net.jcms.framework.menu.web;
 
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.menu.model.MenuRole;
import net.jcms.framework.menu.model.MenuRoleSearch;
import net.jcms.framework.menu.service.MenuRoleService;
import net.jcms.framework.menu.service.MenuService;

@Controller
@Slf4j
public class MenuRoleController extends BaseController{
 
	@Resource(name="menuService")
	private MenuService menuService;
	 
	@Resource(name="menuRoleService")
	private MenuRoleService menuRoleService;
	
	@RequestMapping(value = "/system/menuRole/list.json")
	@ResponseBody
	public Map<String, Object> menuList(String roleAuth) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			MenuRoleSearch menuRoleSearch = new MenuRoleSearch();
			menuRoleSearch.setRoleAuth(roleAuth);
			
			result.put ("data", menuRoleService.selectList(menuRoleSearch));
			result.put ("result", "success");
		}catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put ("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
	@RequestMapping(value = "/system/menuRole/update.json")
	@ResponseBody
	public Map<String, Object> update(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String roleAuth = request.getParameter("roleAuth");
			MenuRole menuRole = new MenuRole();
			menuRole.setRoleAuth(roleAuth);
			menuRoleService.delete(menuRole);

			String[] checkIdList = request.getParameterValues("checkIdList[]");
			if(checkIdList != null){
				for(String checkId : checkIdList) {
					//최상위 메뉴만 있고 자식메뉴는 없을 때 처리 방안
					if(!"#".equals(checkId)){
						menuRole.setMenuId(Long.parseLong(checkId));
						menuRoleService.insert(menuRole);
					}
				}
			}
			menuService.initRoleMenuList();
			result.put ("result", "success");
		}catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put ("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
}
