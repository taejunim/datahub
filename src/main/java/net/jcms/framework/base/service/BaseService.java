package net.jcms.framework.base.service;

import java.util.List;
import java.util.Map;

public interface BaseService<T, S> {
	List<T> selectList (S s);

	List<Map<String, Object>> selectList4Map (S s);

	int count(S s);
	T select (S s);

	void insert (T t);
	void update (T t);
	void delete (T t);
}
