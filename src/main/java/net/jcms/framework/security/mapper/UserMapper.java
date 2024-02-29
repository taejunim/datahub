package net.jcms.framework.security.mapper;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserSearch;

@Mapper (value="userMapper")
public interface UserMapper extends BaseMapper<User, UserSearch> {
	
	User login (User user);
	int checkIdDuplicate(UserSearch userSearch);
	
	void updateUserLoginFail(User user);
	void updateInitUserLoginFailCnt(User user);
	int userPwdCheck(UserSearch userSearch);
	void updatePwd(User user);
	
}
