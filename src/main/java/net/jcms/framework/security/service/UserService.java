package net.jcms.framework.security.service;

import java.util.List;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserSearch;

public interface UserService extends BaseService<User, UserSearch>  {
	User login(User user);
	void join(User user);
	void findPw(UserSearch userSearch);
	int checkIdDuplicate(UserSearch userSearch);
	void updateUserLoginFail(User user);
	void updateInitUserLoginFailCnt(User user);
	int userPwdCheck(UserSearch userSearch);
	void updatePwd(User user);

}
