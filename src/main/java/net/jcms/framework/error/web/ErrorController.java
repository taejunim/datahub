package net.jcms.framework.error.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import net.jcms.framework.base.web.BaseController;

@Controller
public class ErrorController extends BaseController {
	
	@RequestMapping("/error/error.mng")
	public String error(@RequestParam ("errorCode") String errorCode, ModelMap modelMap) {
		modelMap.addAttribute ("errorCode", errorCode);
		return "error/error";
	}
}
