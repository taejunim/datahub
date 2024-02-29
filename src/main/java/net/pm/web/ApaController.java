package net.pm.web;

import lombok.extern.slf4j.Slf4j;
import net.datahub.martData.model.*;
import net.datahub.martData.service.*;
import net.jcms.framework.base.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value="/pm/apa")
public class ApaController extends BaseController {

    @RequestMapping(value="/getAfosList.json", method = RequestMethod.POST)
    public List<AcdntOcfr> getAfosList(HttpServletRequest request, String type) {
        log.debug("getAfosList starts!");

        List<AcdntOcfr> rst = new ArrayList<>();
        switch (type) {
            case "01" :
                List<BcclAcdntOcfrRng> list01 = bcclAcdntOcfrRngService.selectList(null);
                for(BcclAcdntOcfrRng item : list01) rst.add(item);
                break;
            case "02" :
                List<WalkEldAcdntOcfrRng> list02 = walkEldAcdntOcfrRngService.selectList(null);
                for(WalkEldAcdntOcfrRng item : list02) rst.add(item);
                break;
            case "03" :
                List<WalkCldAcdntOcfrRng> list03 = walkCldAcdntOcfrRngService.selectList(null);
                for(WalkCldAcdntOcfrRng item : list03) rst.add(item);
                break;
            case "04" :
                List<PdsWtmsCrsAcdntOcfrRng> list04 = pdsWtmsCrsAcdntOcfrRngService.selectList(null);
                for (PdsWtmsCrsAcdntOcfrRng item : list04) rst.add(item);
                break;
            case "05" :
                List<SchzoneCldAcdntOcfrRng> list05 = schzoneCldAcdntOcfrRngService.selectList(null);
                for(SchzoneCldAcdntOcfrRng  item : list05) rst.add(item);
                break;
            case "06" :
                List<TwhAcdntOcfrRng> list06 = twhAcdntOcfrRngService.selectList(null);
                for(TwhAcdntOcfrRng item : list06) rst.add(item);
                break;
            case "10" :
                List<PdsAcdntOcfrRng> list10 = pdsAcdntOcfrRngService.selectList(null);
                for(PdsAcdntOcfrRng item : list10) rst.add(item);
                break;
        }

        return rst;
        /*String type = request.getParameter("type");
        Afos afos = Afos.builder()
                        .type(type)
                        .build();

        List<Afos> afosList = afosService.selectAfosList(afos);
        return null;*/
    }

    @RequestMapping(value="/getDthTrnsList.json", method = RequestMethod.GET)
    public List<DthTrnsAcdntRngInfo> getAfosList(HttpServletRequest request) {
        log.debug("getDthTrnsList starts!");
        return dthTrnsAcdntRngInfoService.selectList(null);
    }

    @Autowired
    private PdsAcdntOcfrRngService pdsAcdntOcfrRngService;
    @RequestMapping(value="/getPdsAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<PdsAcdntOcfrRng> getPdsAcdntOcfrRngList() {
        log.debug("getPdsAcdntOcfrRngList starts!");

        List<PdsAcdntOcfrRng> pdsAcdntOcfrRngList = pdsAcdntOcfrRngService.selectList(null);
        return pdsAcdntOcfrRngList;
    }

    @Autowired
    private TwhAcdntOcfrRngService twhAcdntOcfrRngService;
    @RequestMapping(value="/getTwhAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<TwhAcdntOcfrRng> getTwhAcdntOcfrRngList() {
        log.debug("getTwhAcdntOcfrRngList starts!");

        List<TwhAcdntOcfrRng> twhAcdntOcfrRngList = twhAcdntOcfrRngService.selectList(null);
        return twhAcdntOcfrRngList;
    }

    @Autowired
    private DtlLnkgRoadRiskIdxService dtlLnkgRoadRiskIdxService;
    @RequestMapping(value="/getDtlLnkgRoadRiskIdxList.json", method = RequestMethod.GET)
    public List<DtlLnkgRoadRiskIdx> getDtlLnkgRoadRiskIdxList() {
        log.debug("getDtlLnkgRoadRiskIdxList starts!");

        List<DtlLnkgRoadRiskIdx> dtlLnkgRoadRiskIdxList = dtlLnkgRoadRiskIdxService.selectList(null);
        System.out.println(dtlLnkgRoadRiskIdxList.get(0).getLine_string());
        return dtlLnkgRoadRiskIdxList;
    }

    @RequestMapping(value="/getDtlLnkgRoadRiskIdxGrdKinds.json", method = RequestMethod.GET)
    public List<String> getDtlLnkgRoadRiskIdxGrdKinds() {
        log.debug("getDtlLnkgRoadRiskIdxGrdKinds starts!");

        List<String> kinds = dtlLnkgRoadRiskIdxService.getDggrGrdKinds();

        return kinds;
    }

    @Autowired
    private LnkgBaseAcdntRiskRngService lnkgBaseAcdntRiskRngService;
    @RequestMapping(value="/getLnkgBaseAcdntRiskRngList.json", method = RequestMethod.GET)
    public List<LnkgBaseAcdntRiskRng> getLnkgBaseAcdntRiskRngList() {
        log.debug("getLnkgBaseAcdntRiskRngList starts!");

        List<LnkgBaseAcdntRiskRng> lnkgBaseAcdntRiskRngList = lnkgBaseAcdntRiskRngService.selectList(null);
        return lnkgBaseAcdntRiskRngList;
    }

    @Autowired
    private DthTrnsAcdntRngInfoService dthTrnsAcdntRngInfoService;
    @RequestMapping(value="/getDthTrnsAcdntRngInfoList.json", method = RequestMethod.GET)
    public List<DthTrnsAcdntRngInfo> getDthTrnsAcdntRngInfoList() {
        log.debug("getDthTrnsAcdntRngInfoList starts!");
        try {
            List<DthTrnsAcdntRngInfo> dthTrnsAcdntRngInfoList = dthTrnsAcdntRngInfoService.selectList(null);
            return dthTrnsAcdntRngInfoList;
        } catch (Exception e) {
            e.getStackTrace();
            return null;
        }
    }

    @Autowired
    private BcclAcdntOcfrRngService bcclAcdntOcfrRngService;
    @RequestMapping(value="/getBcclAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<BcclAcdntOcfrRng> getBcclAcdntOcfrRngList() {
        log.debug("getBcclAcdntOcfrRngList starts!");

        List<BcclAcdntOcfrRng> bcclAcdntOcfrRngList = bcclAcdntOcfrRngService.selectList(null);
        return bcclAcdntOcfrRngList;
    }

    @Autowired
    private WalkEldAcdntOcfrRngService walkEldAcdntOcfrRngService;
    @RequestMapping(value="/getWalkEldAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<WalkEldAcdntOcfrRng> getWalkEldAcdntOcfrRngList() {
        log.debug("getWalkEldAcdntOcfrRngList starts!");

        List<WalkEldAcdntOcfrRng> walkEldAcdntOcfrRngList = walkEldAcdntOcfrRngService.selectList(null);
        return walkEldAcdntOcfrRngList;
    }

    @Autowired
    private WalkCldAcdntOcfrRngService walkCldAcdntOcfrRngService;
    @RequestMapping(value="/getWalkCldAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<WalkCldAcdntOcfrRng> getWalkCldAcdntOcfrRngList() {
        log.debug("getWalkCldAcdntOcfrRngList starts!");

        List<WalkCldAcdntOcfrRng> walkCldAcdntOcfrRngList = walkCldAcdntOcfrRngService.selectList(null);
        return walkCldAcdntOcfrRngList;
    }

    @Autowired
    private SchzoneCldAcdntOcfrRngService schzoneCldAcdntOcfrRngService;
    @RequestMapping(value="/getSchzoneCldAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<SchzoneCldAcdntOcfrRng> getSchzoneCldAcdntOcfrRngList() {
        log.debug("getSchzoneCldAcdntOcfrRngList starts!");

        List<SchzoneCldAcdntOcfrRng> schzoneCldAcdntOcfrRngList = schzoneCldAcdntOcfrRngService.selectList(null);
        return schzoneCldAcdntOcfrRngList;
    }

    @Autowired
    private PdsWtmsCrsAcdntOcfrRngService pdsWtmsCrsAcdntOcfrRngService;
    @RequestMapping(value="/getPdsWtmsCrsAcdntOcfrRngList.json", method = RequestMethod.GET)
    public List<PdsWtmsCrsAcdntOcfrRng> getPdsWtmsCrsAcdntOcfrRngList() {
        log.debug("getPdsWtmsCrsAcdntOcfrRngList starts!");

        List<PdsWtmsCrsAcdntOcfrRng> pdsWtmsCrsAcdntOcfrRngList = pdsWtmsCrsAcdntOcfrRngService.selectList(null);
        return pdsWtmsCrsAcdntOcfrRngList;
    }
}
