package net.jcms.framework.base.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.base.model.BaseModel;
import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.security.model.User;

public class BaseServiceImpl<T, S, M extends BaseMapper<T, S>> extends EgovAbstractServiceImpl implements BaseService<T, S> {

	protected M mapper;
	
	protected void setMapper (M mapper) {
		this.mapper = mapper;
	}
	
	@Override
	public List<T> selectList (S s) {
		return mapper.selectList (s);
	}

	@Override
	public List<Map<String, Object>> selectList4Map (S s) {
		return mapper.selectList4Map (s);
	}

	@Override
	public int count(S s) {
		return mapper.count(s);
	}

	@Override
	public T select (S s) {
		return mapper.select (s);
	}
	
	@Override
	public void insert (T t) {
		if(t instanceof BaseModel) ((BaseModel)t).setRegId(getUserId());
		mapper.insert (t);
	}

	@Override
	public void update (T t) {
		if(t instanceof BaseModel) ((BaseModel)t).setUpdId(getUserId());
		mapper.update (t);
	}

	@Override
	public void delete (T t) {
		if(t instanceof BaseModel) ((BaseModel)t).setDelId(getUserId());
		mapper.delete (t);
	}

	/**
	 * 접속 사용자 아이디(번호)를 가져 온다.
	 */
	protected Long getUserId () {
		if("anonymousUser".equals(EgovUserDetailsHelper.getAuthenticatedUser())) return null;
		
		User user = (User)EgovUserDetailsHelper.getAuthenticatedUser();
		if (user != null) {
			return user.getUserId ();
		}
		return null;
	}
}
