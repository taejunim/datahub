package net.pm.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.datahub.martTrnsAcdntOcrnBrnch.model.MartTrnsAcdntOcrnBrnch;
import net.datahub.martTrnsAcdntOcrnBrnch.service.MartTrnsAcdntOcrnBrnchService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.mapper.AcdntRcptInfoMapper;
import net.pm.model.AcdntRcptInfo;
import net.pm.service.TrnsAcdntOcrnBrnchService;
import net.pm.service.utils.GpsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Slf4j
@Service(value="trnsAcdntOcrnBrnchService")
public class TrnsAcdntOcrnBrnchServiceImpl extends BaseServiceImpl<AcdntRcptInfo, AcdntRcptInfo, AcdntRcptInfoMapper> implements TrnsAcdntOcrnBrnchService {
    @Override
    @Resource(name="acdntRcptInfoMapper")
    protected void setMapper (AcdntRcptInfoMapper mapper) {
        super.setMapper (mapper);
    }

    @Autowired
    private MartTrnsAcdntOcrnBrnchService martTrnsAcdntOcrnBrnchService;

    @Override
    public void updateAcdntRcptInfo() {
        try {
            String last_id = mapper.selectLastId();
            String spot_id = mapper.selectSpotLastId();

            MartTrnsAcdntOcrnBrnch srch = new MartTrnsAcdntOcrnBrnch();
            String idx = null;
            if(last_id!=null) {
                String[] buff = last_id.split(AcdntRcptInfo.idSplitter);
                String[] spBuff = null;

                if (spot_id!=null) {
                    spBuff = spot_id.split(AcdntRcptInfo.idSplitter);
                }

                if(buff.length > 1) {
                    try {
                        if (spBuff!=null&&spBuff.length>1) {
                            Date sd = AcdntRcptInfo.sdf.parse(spBuff[0]);
                            srch.setCrtDt(new Timestamp(sd.getTime() + 1));
                        }
                        idx = buff[1];
                    } catch (RuntimeException e) {
                        log.error("updateAcdntRcptInfo error occurred!");
                    }
                }
            }
            List<MartTrnsAcdntOcrnBrnch> rst = martTrnsAcdntOcrnBrnchService.selectOffeList(srch);
            rst.stream().forEach(obj -> obj.setAccKindCd("01"));

            List<MartTrnsAcdntOcrnBrnch> dmgeRst = martTrnsAcdntOcrnBrnchService.selectDmgeList(srch);
            dmgeRst.stream().forEach(obj -> obj.setAccKindCd("02"));
            rst.addAll(dmgeRst);
            Collections.sort(rst);

            insertAcdntRcptInfo(rst, idx);
        } catch (NullPointerException e) {
            log.error("updateAcdntRcptInfo error occurred!");
        } catch (ParseException e) {
            log.error("updateAcdntRcptInfo error occurred!");
        } catch (Exception e) {
            log.error("updateAcdntRcptInfo error occurred!");
        }
    }

    private void insertAcdntRcptInfo(List<MartTrnsAcdntOcrnBrnch> list, String lastId) {
        if(list==null || list.size()<1) return;
        long idx = 0;
        if(lastId != null) {
            idx = Long.parseLong(lastId);
        }

        for(MartTrnsAcdntOcrnBrnch mari : list) {
            try {
                AcdntRcptInfo ari = new AcdntRcptInfo(mari, ++idx);
                ari.setAcdntSpot(GpsUtil.cvtCoordToAddrRegion3(ari.getAcdntX() + "," + ari.getAcdntY()));
                mapper.insert(ari);
            } catch (NullPointerException e) {
                log.error("insertAcdntRcptInfo error occurred!");
            } catch (IndexOutOfBoundsException e) {
                log.error("insertAcdntRcptInfo error occurred!");
            } catch (Exception e) {
                log.error("insertAcdntRcptInfo error occurred!");
            }
        }
    }


}
