package net.pm.web;

import lombok.extern.slf4j.Slf4j;
import net.pm.service.PmAccService;
import net.pm.service.PmAcdntRcptInfoService;
import net.pm.service.PmDrivingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Slf4j
@Controller
@RequestMapping(value = "/pm/gis")
public class GisController {

    @Autowired
    private PmAcdntRcptInfoService pmAcdntRcptInfoService;
    @Autowired
    private PmAccService pmAccService;

    @Autowired
    private PmDrivingService pmDrivingService;

    @RequestMapping(value = "/accidentLayer.mng", method = RequestMethod.GET)
    public String accidentLayer(Model model) {
        log.debug("accidentLayer Controller starts!");

        List<String> operators = pmAccService.selectOpers();
        List<String> accTypes = pmAccService.selectAccTypes();
        List<String> pmKinds = pmAccService.selectPmKinds();
        List<String> spot = pmAccService.selectSpot();
        List<String> sex = pmAccService.selectSex();

        model.addAttribute("operators", operators);
        model.addAttribute("accTypes", accTypes);
        model.addAttribute("pmKinds", pmKinds);
        model.addAttribute("spot", spot);
        model.addAttribute("sex", sex);

        return "ajax/gis/accidentLayer";
    }

    @RequestMapping(value = "/usageLayer.mng", method = RequestMethod.GET)
    public String usageLayer(Model model) {
        log.debug("usageLayer Controller starts!");

        List<String> operators = pmDrivingService.selectOpers();
        model.addAttribute("operators", operators);

        return "ajax/gis/usageLayer";
    }

}
