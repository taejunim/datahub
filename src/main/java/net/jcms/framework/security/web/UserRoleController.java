package net.jcms.framework.security.web;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.service.UserRoleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
public class UserRoleController extends BaseController {

	@Resource(name="userRoleService")
	private UserRoleService userRoleService;

	@RequestMapping (value = "/system/user/roleInsert.json", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> roleInsert(UserRole userRole) {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			userRoleService.update(userRole);
			result.put("result", "success");
		} catch (RuntimeException e){
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 회원관리 : 권한부여 기능
	/*@RequestMapping(value = "/system/userRole/list.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, UserRole userRole) {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			String sort = request.getParameter("columns[" + request.getParameter("order[0][column]") + "][name]" );
			String sortOder = request.getParameter("order[0][dir]");
			userRole.setSort(sort);
			userRole.setSortOrd(sortOder);
			userRole.setPagingYn(true);

			int totalCount = userRoleService.count(userRole);
			result.put("recordsTotal", totalCount);
			result.put("recordsFiltered", totalCount);
			
			result.put("data", userRoleService.selectRoleList(userRole));
			result.put("result", "success");
		} catch (RuntimeException e){
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}*/

	@RequestMapping(value="/system/userRole/update.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(UserRole userRole){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			userRoleService.update(userRole);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

}
