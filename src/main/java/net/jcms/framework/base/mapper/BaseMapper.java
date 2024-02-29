package net.jcms.framework.base.mapper;

import java.util.List;
import java.util.Map;

public interface BaseMapper<T, S> {
	List<T> selectList (S s);
	Integer count(S s);
	T select (S s);
	
	void insert (T t);
	void update (T t);
	void delete (T t);

	List<Map<String, Object>> selectList4Map(S s);
}
