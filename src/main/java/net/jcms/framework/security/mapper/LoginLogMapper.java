package net.jcms.framework.security.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.menu.model.MenuConnHistSearch;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.security.model.LoginLog;
import net.jcms.framework.security.model.LoginLogSearch;

import java.util.List;

@Mapper (value="loginLogMapper")
public interface LoginLogMapper extends BaseMapper<LoginLog, LoginLogSearch> {
    List<LoginLogSearch> countByDate(LoginLogSearch loginLogSearch);
}
