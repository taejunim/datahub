package net.jcms.framework.menu.web;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.security.model.LoginLogSearch;
import net.jcms.framework.security.service.LoginLogService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@Slf4j
public class CmsMenuStatsController extends BaseController {

	@Resource (name="loginLogService")
	private LoginLogService loginLogService;
	
	@RequestMapping (value="/system/siteStats/list.mng", method=RequestMethod.GET)
	public String siteList(){
		return "system/stats/siteStatsList";
	}
	
	@RequestMapping (value="/system/siteStats/list.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> siteList(HttpServletRequest request, LoginLogSearch loginLogSearch){
		Map<String , Object> result = new HashMap<String, Object>();
		try {
			String startSearchDt = request.getParameter("startSearchDt");
			String endSearchDt = request.getParameter("endSearchDt");
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

			if(startSearchDt.equals("")) {
				loginLogSearch.setSort("LOGIN_DT");
				loginLogSearch.setSortOrd("ASC");
				startSearchDt = simpleDateFormat.format(loginLogService.selectList(loginLogSearch).get(0).getLoginDt());
				loginLogSearch.setStartSearchDt(startSearchDt);
			}

			if(endSearchDt.equals("")) {
				Date now = new Date();
				endSearchDt = simpleDateFormat.format(now);
				loginLogSearch.setEndSearchDt(endSearchDt);
			}

			Date startDt = simpleDateFormat.parse(startSearchDt);
			Date endDt = simpleDateFormat.parse(endSearchDt);

			long diffSec = (endDt.getTime() - startDt.getTime()) / 1000;
			long diffDays = diffSec / (24 * 60 * 60);

			List<Integer> indexList = new ArrayList<>();
			for (int i = 1; i <= diffDays; i++) {
				indexList.add(i);
			}
			loginLogSearch.setIndexList(indexList);

			result.put("data", loginLogService.countByDate(loginLogSearch));
			result.put("result", "success");
		} catch (RuntimeException | ParseException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
}
