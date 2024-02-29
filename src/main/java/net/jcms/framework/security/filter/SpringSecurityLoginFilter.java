package net.jcms.framework.security.filter;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.menu.service.MenuService;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.service.UserRoleService;
import net.jcms.framework.security.service.UserService;
import net.jcms.framework.util.PropertiesUtil;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Security;
import java.util.Base64;
import java.util.Map;

@Slf4j
@WebFilter("/LoginFilter")
public class SpringSecurityLoginFilter implements Filter {
	private FilterConfig filterConfig;

	private static final Logger logger = LoggerFactory.getLogger(SpringSecurityLoginFilter.class);

    public SpringSecurityLoginFilter() {
    }

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// 로그인 URL
		logger.debug ("------------------------- starting SpringSecurityLoginFilter-----------------------------");
		
		String loginURL = filterConfig.getInitParameter("loginURL");
		loginURL = loginURL.replaceAll("\r", "").replaceAll("\n", "");
		String loginProcessURL = filterConfig.getInitParameter("loginProcessURL");
		loginProcessURL = loginProcessURL.replaceAll("\r", "").replaceAll("\n", "");

		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpServletResponse httpResponse = (HttpServletResponse)response;
		HttpSession session = httpRequest.getSession();
		String requestURL = httpRequest.getRequestURI();
		
		if (EgovUserDetailsHelper.getAuthenticatedUser() == null || requestURL.contains(loginProcessURL)) {
			logger.debug ("------------------------- processing login SpringSecurityLoginFilter-----------------------------");

			try {
				ApplicationContext act = WebApplicationContextUtils.getRequiredWebApplicationContext(filterConfig.getServletContext());

				Security.addProvider(new BouncyCastleProvider());

				String encryptionKey = PropertiesUtil.getProperty("AppConf.encrypt.AesKey");
				String iv = PropertiesUtil.getProperty("AppConf.encrypt.AesKey");

				String decryptedUserLoginId = null;
				String decryptedUserPwd = null;

				try {
					byte[] encryptedUserLoginIdBytes = Base64.getDecoder().decode(request.getParameter ("userLoginId"));
					byte[] encryptedUserPwdBytes = Base64.getDecoder().decode(request.getParameter ("userPwd"));
					Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding", "BC");
					SecretKeySpec keySpec = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
					IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes("UTF-8"));
					cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
					byte[] decryptedUserLogInBytes = cipher.doFinal(encryptedUserLoginIdBytes);
					byte[] decryptedUserPwdBytes = cipher.doFinal(encryptedUserPwdBytes);

					decryptedUserLoginId = new String(decryptedUserLogInBytes, "UTF-8");
					decryptedUserPwd = new String(decryptedUserPwdBytes, "UTF-8");
				} catch (UnsupportedEncodingException e) {
					log.error("SpringSecurityLoginFilter error occurred");
				} catch (Exception e) {
					log.error("SpringSecurityLoginFilter error occurred");
				}

				UserService userService = (UserService) act.getBean ("userService");
				User user = new User ();
				user.setUserLoginId (decryptedUserLoginId);
				user.setUserPwd (decryptedUserPwd);
				user = userService.login (user);
				
				UsernamePasswordAuthenticationFilter springSecurity = null;
				 
				@SuppressWarnings("rawtypes")
				Map beans = act.getBeansOfType(UsernamePasswordAuthenticationFilter.class);
				if (beans.size() > 0) {
					springSecurity = (UsernamePasswordAuthenticationFilter)beans.values().toArray()[0];
				} else {
					logger.debug ("------------------------- fail to get authenticationProcssingFilter SpringSecurityLoginFilter-----------------------------");
					throw new IllegalStateException("No AuthenticationProcessingFilter");
				}
				
				if(user == null) { //로그인 실패
					springSecurity.doFilter (new RequestWrapperForSecurity(httpRequest, null, null), response, chain);
					return;
				}else {
					session.setAttribute ("user", user);

					UserRoleService userRoleService = (UserRoleService) act.getBean ("userRoleService");
					UserRole userRole = new UserRole();
					userRole.setUserId(user.getUserId());
					userRole = userRoleService.select(userRole);
					session.setAttribute ("userRole" , userRole.getRoleAuth());

					MenuService menuService = (MenuService) act.getBean ("menuService");
					menuService.selectRoleMenuList(user.getUserId(),true);
					
					springSecurity.doFilter (new RequestWrapperForSecurity(httpRequest, user.getUserLoginId(), user.getUserPwd ()), response, chain);
				}
			} catch (RuntimeException ex) {
				StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
				logger.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());

				RequestDispatcher dispatcher = httpRequest.getRequestDispatcher(loginURL);
				dispatcher.forward(httpRequest, httpResponse);
			}
		}
		chain.doFilter (request, response);
	}

	public void destroy() {
	}

}

class RequestWrapperForSecurity extends HttpServletRequestWrapper {
	private String username = null;
	private String password = null;

	public RequestWrapperForSecurity(HttpServletRequest request, String username, String password) {
		super(request);

		this.username = username;
		this.password = password;
	}

	@Override
	public String getRequestURI() {
		return ((HttpServletRequest) super.getRequest()).getContextPath() + "/j_spring_security_check";
	}

	@Override
	public String getParameter(String name) {
		if (name.equals("j_username")) {
			return username;
		}

		if (name.equals("j_password")) {
			return password;
		}

		return super.getParameter(name);
	}
}
