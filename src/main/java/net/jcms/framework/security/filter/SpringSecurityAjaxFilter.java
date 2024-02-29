package net.jcms.framework.security.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;

@Slf4j
public class SpringSecurityAjaxFilter implements Filter {
	private FilterConfig filterConfig;

	private static final Logger logger = LoggerFactory.getLogger(SpringSecurityAjaxFilter.class);
	private String ajaxHeader;
    public SpringSecurityAjaxFilter() {
    }

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
	    HttpServletResponse res = (HttpServletResponse) response;
	    if (isAjaxRequest(req)) {
			try {
				if(!req.getServletPath().contains("/login/")) {
					if (req.getSession().getAttribute("user") == null) {
						res.sendError(500);
					}
				}
				chain.doFilter(req, res);
			} catch (AccessDeniedException e) {
				StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
				log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
	            res.sendError(HttpServletResponse.SC_FORBIDDEN);
			} catch (AuthenticationException e) {
	         	StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
				log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
				res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
			}
		} else {
			chain.doFilter(req, res);
	    }
	}

	private boolean isAjaxRequest(HttpServletRequest req) {
        return req.getHeader(ajaxHeader) != null && req.getHeader(ajaxHeader).equals(Boolean.TRUE.toString());
	}

	public void destroy() {
	}

	public String getAjaxHeader() {
		return ajaxHeader;
	}

	public void setAjaxHeader(String ajaxHeader) {
		this.ajaxHeader = ajaxHeader;
	}
	
}

