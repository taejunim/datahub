package net.jcms.framework.common.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.common.model.Common;
import net.jcms.framework.common.model.CommonSearch;

import java.util.List;
import java.util.Map;

@Mapper (value="commonMapper")
public interface CommonMapper extends BaseMapper<Common, CommonSearch> {
	Long selectMmsCont();

	void insertLayer(Map<String, Object> parmaMap);

	List<Map<String, Object>> addrSelect(CommonSearch commonSearch);

	List<Map<String, Object>> selectLyrList();
}