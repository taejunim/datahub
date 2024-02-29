package net.jcms.framework.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.jcms.framework.security.model.User;
import net.jcms.framework.util.SessionHelper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SessionFilter implements Filter
{
	private static final Logger log = LoggerFactory.getLogger(SessionFilter.class);
	private ArrayList urlList;

	public void destroy(){
	}
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		if (log.isDebugEnabled()) {
			log.debug(" SessionFilter  시작 합니다. ");
		}
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;

		HttpSession hs = request.getSession();
		Enumeration<String> enums = request.getAttributeNames();
		
		User user = (User)hs.getAttribute("user");
		
//		if (log.isDebugEnabled()) {
//			log.info("@@@@@세션의 속성 정보 출력@@@@@");
//			while (enums.hasMoreElements()) {
//				String  attributeName = enums.nextElement();
//				log.info(attributeName + " : " + hs.getAttribute(attributeName));
//			}
//			if(user != null){
//				log.info("user : " + user);
//				log.info("UserLoginId : " + user.getUserLoginId());
//				log.info("RoleAuth : " + user.getRoleAuth());
//			}
//		}
		if (user == null) {
			if (log.isDebugEnabled()) { log.debug(" 인증값이 없습니다. "); }
			response.sendRedirect(request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/login/loginForm.mng"); // 이동할 페이지....
		}else{
			chain.doFilter(req, res);
			
		}

		if (log.isDebugEnabled()) { log.debug(" SessionFilter  종료 합니다. "); }        
	}
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}



//	public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException{
//		HttpServletRequest request = (HttpServletRequest) req;
//		HttpServletResponse response = (HttpServletResponse) res;
//		String url = request.getServletPath();
//
//		if ( urlList.contains(url) ){
//			chain.doFilter(req, res);
//		}else{
//			HttpSession session = request.getSession(false);
//
//			if ( session == null || session.getAttribute("userId") == null )
//			{
//				//System.out.println("## Filter Session Null - " + url);
//				response.sendRedirect("/index.jsp");
//			}
//			else
//			{
//				chain.doFilter(req, res);
//			}
//		}
//	}
//
//	public void init(FilterConfig config) throws ServletException{
//		String urls = config.getInitParameter("avoidUrls");
//		StringTokenizer token = new StringTokenizer(urls, ",");
//
//		urlList = new ArrayList();
//
//		while ( token.hasMoreTokens() ){
//			urlList.add(token.nextToken());
//		}
//	}
}