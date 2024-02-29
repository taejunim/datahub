package net.pm.web;

import lombok.extern.slf4j.Slf4j;
import net.pm.model.GInfra;
import net.pm.service.GInfraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@RequestMapping(value="/pm/ginfra")
public class GInfraController {

    @Autowired
    private GInfraService gInfraService;

    @ResponseBody
    @RequestMapping(value="/getPmModHBList.json", method = RequestMethod.GET)
    public List<GInfra> getPmModHBList() {
        log.debug("getPmModHBList starts!");

        List<GInfra> result = gInfraService.selectPmModHBList();

        return result;
    }

    @ResponseBody
    @RequestMapping(value="/getPmSmhList.json", method = RequestMethod.GET)
    public List<GInfra> getPmSmhList() {
        log.debug("getPmSmhList starts!");

        List<GInfra> result = gInfraService.selectPmSmhList();

        return result;
    }

    @ResponseBody
    @RequestMapping(value="/getPmFisvcFcltList.json", method = RequestMethod.GET)
    public List<GInfra> getPmFisvcFcltList() {
        log.debug("getPmFisvcFcltList starts!");

        List<GInfra> result = gInfraService.selectPmFisvcFcltList();

        return result;
    }

    @ResponseBody
    @RequestMapping(value="/getPmStonList.json", method = RequestMethod.GET)
    public List<GInfra> getPmStonList() {
        log.debug("getPmStonList starts!");

        List<GInfra> result = gInfraService.selectPmStonList();

        return result;
    }
}
