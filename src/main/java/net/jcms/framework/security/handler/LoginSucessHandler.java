package net.jcms.framework.security.handler;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Security;
import java.util.Base64;

import javax.annotation.Resource;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.util.PropertiesUtil;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import net.jcms.framework.security.model.LoginLog;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserSearch;
import net.jcms.framework.security.service.LoginLogService;
import net.jcms.framework.security.service.UserService;
import net.jcms.framework.util.HttpUtil;

@Slf4j
@Component("loginSuccessHadler")
public class LoginSucessHandler implements AuthenticationSuccessHandler{
	
	@Resource (name="userService")
	private UserService userService;
	
	@Resource (name="loginLogService")
	private LoginLogService loginLogService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		Security.addProvider(new BouncyCastleProvider());

		String encryptionKey = PropertiesUtil.getProperty("AppConf.encrypt.AesKey");
		String iv = PropertiesUtil.getProperty("AppConf.encrypt.AesKey");

		String decryptedUserLoginId = null;

		try {
			byte[] encryptedUserLoginIdBytes = Base64.getDecoder().decode(request.getParameter ("userLoginId"));
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding", "BC");
			SecretKeySpec keySpec = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
			IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes("UTF-8"));
			cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
			byte[] decryptedUserLogInBytes = cipher.doFinal(encryptedUserLoginIdBytes);

			decryptedUserLoginId = new String(decryptedUserLogInBytes, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("onAuthenticationSuccess error occurred");
		} catch (Exception e) {
			log.error("onAuthenticationSuccess error occurred");
		}

		UserSearch userSearch = new UserSearch();
		userSearch.setUserLoginId(decryptedUserLoginId);
		User user = userService.select(userSearch);
		
		LoginLog loginLog = new LoginLog();
		loginLog.getUser().setUserId(user.getUserId());
		loginLog.setLoginIp(HttpUtil.getClientIp(request));
        loginLogService.insert(loginLog);
        
        HttpSession session = request.getSession();
        
        session.setAttribute("loginLogId", loginLog.getLoginLogId());
		session.setAttribute("failCnt", 0);
		
		// 오라클은 주석 처리해야 실행 updateInitUserLoginFailCnt 확인
        user.setFailCnt(0);
        userService.updateInitUserLoginFailCnt(user);
	}

}
