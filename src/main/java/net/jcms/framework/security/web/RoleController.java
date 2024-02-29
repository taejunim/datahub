package net.jcms.framework.security.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.security.model.Role;
import net.jcms.framework.security.model.ScurRscRole;
import net.jcms.framework.security.service.RoleService;
import net.jcms.framework.security.service.ScurRscRoleService;

@Controller
@Slf4j
public class RoleController extends BaseController {

	@Resource(name="roleService")
	private RoleService roleService;
	
	@Resource (name="scurRscRoleService")
	private ScurRscRoleService scurRscRoleService;
	
	@RequestMapping("/system/role/list.mng")
	public String site(Model model, Role role){
		model.addAttribute("roleList", roleService.selectList(role));
		return "system/scur/roleList";
	}
	
	@RequestMapping(value = "/system/role/list.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, Role role) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String sort = request.getParameter("columns[" + request.getParameter("order[0][column]") + "][name]");
			String sortOrd = request.getParameter("order[0][dir]");
			role.setSort(sort);
			role.setSortOrd(sortOrd);
			role.setPagingYn(true);

			int totalCount = roleService.count(role);
			result.put("recordsTotal", totalCount);
			result.put("recordsFiltered", totalCount);

			result.put("data", roleService.selectList(role));
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
	@RequestMapping(value="/system/role/insert.json",  method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insert(Role role){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			if(roleService.existCount(role) > 0) {
				result.put("result", "duplicate");
				result.put("message", "이미 등록된 권한입니다. 다시 등록하여 주십시오.");
			} else {
				roleService.insert(role);
				result.put("result", "success");
			}
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
	@RequestMapping(value="/system/role/delete.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(Role role){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			ScurRscRole scurRscRole = new ScurRscRole();
			scurRscRole.setRoleAuth(role.getRoleAuth());
			int count = scurRscRoleService.count(scurRscRole);
			if(count > 0) {
				result.put("result", "duplicate");
				result.put("message", "사용중인 자원아이디 있습니다. 권한 롤 등록 여부를 확인하세요.("+count+")");
			} else {
				roleService.delete(role);
				result.put("result", "success");
			}
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	@RequestMapping(value="/system/role/update.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(HttpServletRequest request){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			roleService.update(binding(request, new Role()));
			result.put("result", "success");
		} catch (RuntimeException | BindException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
}
