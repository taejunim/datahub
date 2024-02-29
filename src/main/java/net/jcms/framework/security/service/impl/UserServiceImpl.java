package net.jcms.framework.security.service.impl;

import java.util.List;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.UserMapper;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.model.UserSearch;
import net.jcms.framework.security.service.UserRoleService;
import net.jcms.framework.security.service.UserService;
import net.jcms.framework.util.StrUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service(value="userService")
@Slf4j
public class UserServiceImpl extends BaseServiceImpl<User, UserSearch, UserMapper> implements UserService {

	@Override
	@Resource (name="userMapper")
	protected void setMapper (UserMapper mapper) {
		super.setMapper (mapper);
	}

	@Resource (name = "userRoleService")
	private UserRoleService userRoleService;

	@Override
	public User login (User user) {
		if (StringUtils.isEmpty (user.getUserLoginId ()) || StringUtils.isEmpty (user.getUserPwd ())) {
			return null;
		}
		User temp = mapper.login (user);
		if (temp == null || StringUtils.isEmpty (temp.getUserPwd ())) {
			return null;
		}
		try {
			if (!temp.getUserPwd ().equals (StrUtil.encryptSha512 (user.getUserPwd (), user.getUserLoginId ()))) {
				temp.setFailCnt (temp.getFailCnt () + 1);
				mapper.updateUserLoginFail (temp);
				return null;
			} else if (temp.getFailCnt () > 5){
				return null;
			}
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			return null;
		}
		return temp; 
	}

	@Override
	public void join(User user) {
		user.setUserPwd(StrUtil.encryptSha512(user.getUserPwd(), user.getUserLoginId()));
		super.insert(user);

		// 회원가입시 디폴트로 일반사용자 권한 부여
		UserRole userRole = new UserRole();
		userRole.setUserId(user.getUserId());
		userRole.setRoleAuth("ROLE_USER");
		userRoleService.insert(userRole);
	}

	@Override
	public void findPw(UserSearch userSearch) {
		
		User user = super.select(userSearch);
		
		String pwd = StrUtil.tempPwd(10);
		
		user.setUserPwd(pwd);
		updatePwd(user);
	
		try{
			String title = "임시비밀번호";
/*			EmailUtil emailUtil = new EmailUtil();
			emailUtil.RealSendMail(UserSearch.getUserEmail(), title ,pwd);
*/		}catch (RuntimeException e){
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
		}
		
	}
	
	
	@Override
	public int checkIdDuplicate(UserSearch userSearch) {
		return mapper.checkIdDuplicate(userSearch);
	}

	@Override
	public void updateUserLoginFail(User user) {
		mapper.updateUserLoginFail(user);
	}

	@Override
	public void updateInitUserLoginFailCnt(User user) {
		mapper.updateInitUserLoginFailCnt(user);
	}

	@Override
	public int userPwdCheck(UserSearch userSearch) {
		return mapper.userPwdCheck(userSearch);
	}

	@Override
	public void insert(User user) {
		try {
			user.setUserPwd(StrUtil.encryptSha512 (user.getUserPwd (), user.getUserLoginId ()));
			super.insert(user);
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
		}
	}

	@Override
	public void updatePwd(User user) {
		try {
			user.setUserPwd(StrUtil.encryptSha512 (user.getUserPwd (), user.getUserLoginId ()));
			mapper.updatePwd(user);
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
		}
	}

}
