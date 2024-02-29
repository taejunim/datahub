package net.pm.service.utils;

import lombok.extern.slf4j.Slf4j;
import net.datahub.martData.model.PdsAcdntOcfrRng;
import net.datahub.martData.service.PdsAcdntOcfrRngService;
import net.datahub.pm.mapper.PostgresGInfraMapper;
import net.pm.mapper.*;
import net.datahub.pm.mapper.PostgresPmLendRtnHstryMapper;
import net.pm.mapper.PmLendRtnHstryMapper;
import net.pm.model.GInfra;
import net.pm.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class SchedulerService {
    @Resource (name="pmLendRtnHstryService")
    private PmLendRtnHstryService pmLendRtnHstryService;

    // postgres mapper
    @Resource (name="postgresPmLendRtnHstryMapper")
    private PostgresPmLendRtnHstryMapper postgresPmLendRtnHstryMapper;
    @Resource (name="postgresGInfraMapper")
    private PostgresGInfraMapper postgresGInfraMapper;

    // mysql mapper
    @Resource (name="pmLendRtnHstryMapper")
    private PmLendRtnHstryMapper pmLendRtnHstryMapper;
    @Resource (name="pmModHBMapper")
    private PmModHBMapper pmModHBMapper;
    @Resource (name="pmPedcrssMapper")
    private PmPedcrssMapper pmPedcrssMapper;
    @Resource (name="pmCrsrdMapper")
    private PmCrsrdMapper pmCrsrdMapper;
    @Resource (name="pmSmhMapper")
    private PmSmhMapper pmSmhMapper;
    @Resource (name="pmFisvcFcltMapper")
    private PmFisvcFcltMapper pmFisvcFcltMapper;
    @Resource (name="pmStonMapper")
    private PmStonMapper pmStonMapper;
    @Autowired
    private PdsAcdntOcfrRngService pdsAcdntOcfrRngService;

    @PostConstruct
    public void init() {
        // 초기화 메서드에서 스케줄러 동작
        fetchDBdata();
        updateDate();
    }

    static private boolean runnable = false;

    /*@Scheduled(fixedRate = 10000)*/
    @Scheduled(cron = "0 0 18 1 1,7 *")
    public void fetchDBdata() {

        if (runnable) return;
        runnable = true;

        log.debug("fetchDBdata scheduler starts!");

        // pm_modhb
        try {
            List<GInfra> pmModHBList = postgresGInfraMapper.selectPmModHBList()
                                          .stream().filter(pmModHB->pmModHB.getLocation_x() != 0.0 && pmModHB.getLocation_y() != 0.0)
                                          .collect(Collectors.toList());

            pmModHBMapper.insertPmModHB(pmModHBList);
        } catch (Exception e) {
            log.debug("Failed fetching modhb");
        }

        // pm_pedcrss
        try {
            List<GInfra> pmPedcrssList = postgresGInfraMapper.selectPmPedcrssList()
                                            .stream().filter(pmPedcrss->pmPedcrss.getLocation_x() != 0.0 && pmPedcrss.getLocation_y() != 0.0)
                                            .collect(Collectors.toList());

            pmPedcrssMapper.insertPmPedcrss(pmPedcrssList);
        } catch (Exception e) {
            log.debug("Failed fetching pedcrss");
        }

        // pm_crsrd
        try {
            List<GInfra> pmCrsrdList = postgresGInfraMapper.selectPmCrsrdList()
                                          .stream().filter(pmCrsrd->pmCrsrd.getLocation_x() != 0.0 && pmCrsrd.getLocation_y() != 0.0)
                                          .collect(Collectors.toList());

            pmCrsrdMapper.insertPmCrsrd(pmCrsrdList);
        } catch (Exception e) {
            log.debug("Failed fetching crsrd");
        }

        // pm_smh
        try {
            List<GInfra> pmSmhList = postgresGInfraMapper.selectPmSmhList()
                                        .stream().filter(pmSmh->pmSmh.getLocation_x() != 0.0 && pmSmh.getLocation_y() != 0.0)
                                        .collect(Collectors.toList());

            pmSmhMapper.insertPmSmh(pmSmhList);
        } catch (Exception e) {
            log.debug("Failed fetching smh");
        }

        // pm_fisvc_fclt
        try {
            List<GInfra> pmFisvcFcltList = postgresGInfraMapper.selectPmFisvcFcltList()
                                              .stream().filter(pmFisvcFclt->pmFisvcFclt.getLocation_x() != 0.0 && pmFisvcFclt.getLocation_y() != 0.0)
                                              .collect(Collectors.toList());

            pmFisvcFcltMapper.insertPmFisvcFclt(pmFisvcFcltList);
        } catch (Exception e) {
            log.debug("Failed fetching fisvc_fclt");
        }

        // pm_ston
        try {
            List<GInfra> pmStonList = postgresGInfraMapper.selectPmStonList()
                                         .stream().filter(pmSton->pmSton.getLocation_x() != 0.0 && pmSton.getLocation_y() != 0.0)
                                         .collect(Collectors.toList());

            pmStonMapper.insertPmSton(pmStonList);
        } catch (Exception e) {
            log.debug("Failed fetching ston");
        }

        runnable = false;
    }

    @Autowired
    private LendRtnHstryService lendRtnHstryService;
    @Autowired
    private AcdntRcptInfoService acdntRcptInfoService;
    @Autowired
    private TrnsAcdntOcrnBrnchService trnsAcdntOcrnBrnchService;

    static private boolean runUpdate = false;
    //@Scheduled(cron = "3/10 * * * * *")
    @Scheduled(cron = "0 7 6/1 * * *")
    private void updateDate() {
        if(runUpdate) return;
        runUpdate = true;

        log.debug("test scheduler starts!");
        lendRtnHstryService.updateLendRtnHstry();
        acdntRcptInfoService.updateAcdntRcptInfo();
        trnsAcdntOcrnBrnchService.updateAcdntRcptInfo();

        // 주차판별
        try {
            pmLendRtnHstryService.setParking();
        } catch(NullPointerException e) {
            log.debug("Failed executing setParking func");
        } catch(Exception e) {
            log.debug("Failed executing setParking func");
        }
        runUpdate = false;
    }

    //static private boolean runTest = false;
    //@Scheduled(cron = "3/10 * * * * *")
//    private void test() {
//        //List<PdsAcdntOcfrRng> rst = pdsAcdntOcfrRngService.selectList(null);
//        if(runTest) return;
//        runTest = true;
//        try {
//        }catch (Exception e) {
//
//        }
//        for(int i=0;i<10;i++);
//        runTest = false;
//    }

}
