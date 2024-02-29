package net.jcms.framework.security.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.security.mapper.LoginLogMapper;
import net.jcms.framework.security.model.LoginLog;
import net.jcms.framework.security.model.LoginLogSearch;
import net.jcms.framework.security.service.LoginLogService;

import java.util.List;

@Service(value="loginLogService")
public class LoginLogServiceImpl extends BaseServiceImpl<LoginLog, LoginLogSearch, LoginLogMapper> implements LoginLogService {

	@Override
	@Resource (name="loginLogMapper")
	protected void setMapper (LoginLogMapper mapper) {
		super.setMapper (mapper);
	}
	
	public void logout(Long loginLogId) {
		LoginLog loginLogVO = new LoginLog();
		loginLogVO.setLoginLogId(loginLogId);
		update(loginLogVO);
	}


	@Override
	public List<LoginLogSearch> countByDate(
			LoginLogSearch loginLogSearch) {
		return mapper.countByDate (loginLogSearch);
	}
}
