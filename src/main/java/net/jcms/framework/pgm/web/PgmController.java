package net.jcms.framework.pgm.web;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import lombok.extern.slf4j.Slf4j;
import net.pm.dto.DataTableDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.menu.model.MenuSearch;
import net.jcms.framework.menu.service.MenuService;
import net.jcms.framework.pgm.model.Pgm;
import net.jcms.framework.pgm.model.PgmSearch;
import net.jcms.framework.pgm.service.PgmService;

@Controller
@Slf4j
public class PgmController extends BaseController {
	
	@Resource (name="menuService")
	private MenuService menuService;
	
	@Resource (name="pgmService")
	private PgmService pgmService;
	
	@RequestMapping (value="/system/pgm/list.mng", method=RequestMethod.GET)
	public String list(Model model) {
		return "system/pgm/list";
	}
	
	@RequestMapping (value="/system/pgm/list.json", method=RequestMethod.POST)
	@ResponseBody
	public DataTableDto list(HttpServletRequest request, PgmSearch pgmSearch) {
		String sort = request.getParameter("columns[" + request.getParameter("order[0][column]") + "][name]");
		String sortOder = request.getParameter("order[0][dir]");
		pgmSearch.setSort(sort);
		pgmSearch.setSortOrd(sortOder);
		pgmSearch.setPagingYn(true);

		return DataTableDto.builder()
				.list(pgmService.selectList(pgmSearch))
				.total(pgmService.count(pgmSearch))
				.build();
	}
	
	@RequestMapping (value="/system/pgm/view.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> detail(PgmSearch pgmSearch) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {	
			result.put("data", pgmService.select(pgmSearch));
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
	@RequestMapping (value="/system/pgm/insert.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insert(Pgm pgm) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			pgmService.insert(pgm);
			menuService.initRoleMenuList();;
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}
	
	@RequestMapping (value="/system/pgm/update.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			pgmService.update(binding(request, new Pgm()));
			menuService.initRoleMenuList();
			result.put("result", "success");
		} catch (RuntimeException | BindException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

	@RequestMapping (value="/system/pgm/delete.json", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(Pgm pgm) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			pgmService.delete(pgm);
			menuService.initRoleMenuList();
			result.put("result", "success");
		} catch (RuntimeException e) {
			StackTraceElement cth = Thread.currentThread().getStackTrace()[1];
			log.error("오류발생 >> 위치 함수명: "+cth.getMethodName()+", 줄수: "+cth.getLineNumber());
			result.put("result", "fail");
			result.put("message", "error");
		}
		return result;
	}

}
