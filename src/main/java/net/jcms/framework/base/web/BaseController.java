package net.jcms.framework.base.web;

import net.jcms.framework.base.model.BaseModel;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import net.jcms.framework.security.model.User;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;

import javax.servlet.http.HttpServletRequest;

public class BaseController {

	/**
	 * 빈 문자열의 파리미터인 경우 NULL 로 변경
	 *
	 * @param binder
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
	}


	/**
	 * 접속 사용자 아이디(번호)를 가져 온다.
	 * @return
	 */
	protected Long getUserId () {
		if("anonymousUser".equals(EgovUserDetailsHelper.getAuthenticatedUser())) return null;

		User user = (User)EgovUserDetailsHelper.getAuthenticatedUser();
		if (user != null) {
			return user.getUserId ();
		}

		return null;
	}

	/**
	 * 접속 사용자의 로그인 아이디를 가져온다.
	 * @return
	 */
	protected String getUserLoginId () {
		User user =
				(User)EgovUserDetailsHelper.getAuthenticatedUser();
		if (user != null) {
			return user.getUserLoginId ();
		}
		return null;
	}


	/**
	 * 접속한 사용자의 이름을 가져온다.
	 *
	 * @return
	 */
	protected String getUserName () {
		User user =
				(User)EgovUserDetailsHelper.getAuthenticatedUser();
		if (user != null) {
			return user.getUserNm ();
		}
		return null;
	}

	public static <T extends BaseModel> T binding(final HttpServletRequest req, final T obj) throws BindException {
		ServletRequestDataBinder binder = new ServletRequestDataBinder( obj, obj.getClass().getSimpleName().toLowerCase() );
		BindingResult bindResult = binder.getBindingResult();
		BindException errors = new BindException( bindResult );
		binder.bind( req );
		if (errors.hasErrors()) {
			throw errors;
		}
		return obj;
	}

}
