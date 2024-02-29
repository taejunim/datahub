package net.jcms.framework.common.service;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.common.model.Common;
import net.jcms.framework.common.model.CommonSearch;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface CommonService extends BaseService<Common, CommonSearch> {
	void download(HttpServletResponse response, String path, String fileName, String fileDownName);

	Map getParameterMap(HttpServletRequest request);

	Map<String, Object> selectSiteImgFileUpload(MultipartHttpServletRequest multi);

	String createExcel(HttpServletRequest request, HttpServletResponse respons,
					   List<Map<String, Object>> dataList, String[] title, String[] cont, int[] width);

	void insertLayer(MultipartHttpServletRequest multi);

	List<Map<String, Object>> addrSelect(CommonSearch commonSearch);

	List<Map<String, Object>> selectLyrList();
}