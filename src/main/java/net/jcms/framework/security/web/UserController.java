package net.jcms.framework.security.web;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.cd.model.CdDtl;
import net.jcms.framework.cd.service.CdDtlService;
import net.jcms.framework.security.model.LoginLog;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.model.UserSearch;
import net.jcms.framework.security.service.LoginLogService;
import net.jcms.framework.security.service.RoleService;
import net.jcms.framework.security.service.UserRoleService;
import net.jcms.framework.security.service.UserService;
import net.jcms.framework.util.StrUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
public class UserController extends BaseController {

	@Resource (name="userService")
	private UserService userService;

	@Resource (name="userRoleService")
	private UserRoleService userRoleService;

	@Resource (name="roleService")
	private RoleService roleService;

	@Resource (name="loginLogService")
	private LoginLogService loginLogService;

	@Resource(name = "cdDtlService")
	private CdDtlService cdDtlService;

	// 로그인, 로그아웃
	@RequestMapping (value="/login/loginForm.mng")
	public String loginForm (HttpServletRequest request, Model model) {
		model.addAttribute("path", request.getParameter("path"));
		return "system/login";
	}
	
	@RequestMapping (value="/login/login.mng", method=RequestMethod.POST)
	public String systemLogin (HttpServletRequest request) {
		String path = request.getParameter("path");

		if(!path.equals("") && !path.equals("null") && path != null){
			return "redirect:"+request.getParameter("path");
		}

		return "redirect:/pm/gis/gis.mng?currentMenuId=1040";
	}
	
	@RequestMapping(value="/logout.mng")
	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null){
	    	HttpSession session = request.getSession();
	    	LoginLog loginLog = new LoginLog();
	    	loginLog.setLoginLogId((Long) session.getAttribute("loginLogId"));
	        loginLogService.update(loginLog);
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    return "redirect:/login/loginForm.mng?currentMenuId="+request.getParameter("path");
	}

	// 회원가입여부 확인
	@RequestMapping("/login/find.mng")
	public String findPage() {
		return "system/find";
	}

	@RequestMapping(value = "/login/user/find.json", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> find(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<>();
		try {
			UserSearch userSearch = new UserSearch();
			userSearch = binding(request, userSearch);
			result.put("data", userService.select(userSearch));
			result.put("result", "success");
		} catch (BindException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 회원가입
	@RequestMapping("/login/join.mng")
	public String joinPage() {
		return "system/join";
	}

	@RequestMapping (value="/login/user/join.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> join (User user) {
		Map<String, String> result = new HashMap <String, String> ();
		try{
			userService.join(user);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 회원가입 : 아이디 중복 확인
	// 사용자관리(회원관리) : 사용자 등록시 아이디 중복 확인
	@RequestMapping (value={ "/login/duplicate.json","/system/user/duplicate.json" }, method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> idDuplicate (UserSearch userSearch) {
		Map<String, String> result = new HashMap <String, String> ();
		if (userService.checkIdDuplicate(userSearch) > 0) {
			result.put("result", "exist");
			result.put("message", "이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요.");
		} else {
			result.put("result", "nonExist");
			result.put("message", "사용가능한 아이디입니다.");
		}
		return result;
	}

	// 마이페이지
	@RequestMapping (value="/system/mypage/list.mng", method=RequestMethod.GET)
	public String mypage(HttpServletRequest request,Model model,UserSearch userSearch) {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		userSearch.setUserId(user.getUserId());
		model.addAttribute("userSelect", userService.select(userSearch));

		UserRole userRole = new UserRole();
		userRole.setUserId(user.getUserId());
		model.addAttribute("userRoleSelect", userRoleService.selectRole(userRole));

		return "system/user/mypage";
	}

	// 마이페이지 : 사용자 정보 수정
	@RequestMapping (value="/system/mypage/update.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(HttpServletRequest request){
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			userService.update(binding(request, new User()));
			result.put("result", "success");
		} catch (RuntimeException | BindException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 마이페이지 : 사용자 비밀번호 확인
	@RequestMapping (value = "/system/mypage/pwdCheck.json", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> pwdCheck(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		UserSearch userSearch = new UserSearch();
		userSearch.setUserId(Long.parseLong(request.getParameter("userId")));
		User user = userService.select(userSearch);
		if(!user.getUserPwd().equals(StrUtil.encryptSha512(request.getParameter("userPwd"), user.getUserLoginId()))){
			result.put("result", "notEqual");
		} else {
			result.put("result", "success");
		}
		return result;
	}

	// 마이페이지 : 회원 탈퇴
	@RequestMapping (value = "/system/mypage/userOut.json", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> userOut(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			user.setUserSt("9");
			userService.update(user);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 마이페이지 : 비밀번호 변경
	@RequestMapping (value="/system/mypage/pwdUpdate.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> pwdUpdate(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			userService.updatePwd(user);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리)
	@RequestMapping (value="/system/user/list.mng", method=RequestMethod.GET)
	public String list(Model model) {
		model.addAttribute("roleList", roleService.selectList(null));
		return "system/user/list";
	}

	@RequestMapping (value="/system/user/list.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, UserSearch userSearch) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String sort = request.getParameter("columns[" + request.getParameter("order[0][column]") + "][name]");
			String sortOder = request.getParameter("order[0][dir]");
			userSearch.setSort(sort);
			userSearch.setSortOrd(sortOder);
			userSearch.setPagingYn(true);

			int totalCount = userService.count(userSearch);
			result.put("recordsTotal", totalCount);
			result.put("recordsFiltered", totalCount);

			result.put("data", userService.selectList(userSearch));
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리) : 사용자 정보 등록
	@RequestMapping (value="/system/user/insert.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> userInsert(User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			userService.insert(user);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리) : 사용자 정보 수정
	@RequestMapping (value = "/system/user/update.json", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> userUpdate(User user) {
		Map<String, Object> result = new HashMap<>();
		try {
			userService.update(user);
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리) : 사용자 정보 삭제
	@RequestMapping (value="/system/user/delete.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, String> userDelete (User user) {
		Map<String, String> result = new HashMap <String, String> ();
		try {
			userService.delete(user);
			result.put("result", "success");
		} catch (RuntimeException e){
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리) : 로그인 실패 카운터 초기화
	@RequestMapping (value="/system/user/initFailCnt.json", method=RequestMethod.POST) 
	@ResponseBody
	public Map<String, String> initFailCntUpdate (User user) {
		Map<String, String> result = new HashMap <String, String> ();
		try {
			userService.updateInitUserLoginFailCnt(user);
			result.put("result", "success");
		} catch (RuntimeException e){
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	// 사용자관리(회원관리) : 사용자 정보 상세보기
	@RequestMapping (value="/system/user/detailUser.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> userDetail(UserSearch userSearch){
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			User user = userService.select(userSearch);
			result.put("data", user);
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
