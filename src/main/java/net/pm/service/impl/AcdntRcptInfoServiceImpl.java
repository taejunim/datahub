package net.pm.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.datahub.martAcdntRcptInfo.model.MartAcdntRcptInfo;
import net.datahub.martAcdntRcptInfo.service.MartAcdntRcptInfoService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.mapper.AcdntRcptInfoMapper;
import net.pm.model.AcdntRcptInfo;
import net.pm.service.AcdntRcptInfoService;
import net.pm.service.utils.GpsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Slf4j
@Service(value="acdntRcptInfoService")
public class AcdntRcptInfoServiceImpl extends BaseServiceImpl<AcdntRcptInfo, AcdntRcptInfo, AcdntRcptInfoMapper> implements AcdntRcptInfoService {
	@Override
	@Resource(name="acdntRcptInfoMapper")
	protected void setMapper (AcdntRcptInfoMapper mapper) {
		super.setMapper (mapper);
	}

	@Autowired
	private MartAcdntRcptInfoService martAcdntRcptInfoService;

	@Override
	public void updateAcdntRcptInfo() {
		try {
			String last_id = mapper.selectLastId();
			String info_id = mapper.selectInfoLastId();

			MartAcdntRcptInfo srch = new MartAcdntRcptInfo();
			String idx = null;
			if(last_id!=null) {
				String[] buff = last_id.split(AcdntRcptInfo.idSplitter);
				String[] ifBuff = null;

				if (info_id!=null) {
					ifBuff = info_id.split(AcdntRcptInfo.idSplitter);
				}

				if(buff.length > 1) {
					try {
						if (ifBuff!=null&&ifBuff.length > 1) {
							Date sd = AcdntRcptInfo.sdf.parse(ifBuff[0]);
							srch.setCrtDt(new Timestamp(sd.getTime() + 1));
						}
						idx = buff[1];
					} catch (RuntimeException e) {
						log.error("updateAcdntRcptInfo error occurred!");
					}
				}
			}
			List<MartAcdntRcptInfo> rst = martAcdntRcptInfoService.selectList(srch);
			insertAcdntRcptInfo(rst, idx);

		} catch (NullPointerException e) {
			log.error("updateAcdntRcptInfo nullPointerException occurred!");
		} catch (ArrayIndexOutOfBoundsException e) {
			log.error("updateAcdntRcptInfo arrayIndexOutOfBounds exception occurred!");
		} catch (ParseException e) {
			log.error("updateAcdntRcptInfo parse exception occurred!");
		} catch (Exception e) {
			log.error("updateAcdntRcptInfo error occurred!");
		}
	}

	private void insertAcdntRcptInfo(List<MartAcdntRcptInfo> list, String lastId) {
		if(list==null || list.size()<1) return;
		long idx = 0;
		if(lastId != null) {
			idx = Long.parseLong(lastId);
		}

		// List<LendRtnHstry> n_list = new ArrayList<>();
		for(MartAcdntRcptInfo mari : list) {
			try {
				AcdntRcptInfo ari = new AcdntRcptInfo(mari, ++idx);
				String[] plc = GpsUtil.cvtAddrToCoord(ari.getAcdntOcrnPlc());
				if(plc != null) {
					if(plc[0]!=null) ari.setAcdntX(Double.parseDouble(plc[0]));
					if(plc[1]!=null) ari.setAcdntY(Double.parseDouble(plc[1]));
					if(plc[2]!=null) ari.setAcdntSpot(plc[2]);
				}
				mapper.insert(ari);
			} catch (Exception e) {
				log.error(e.getMessage());
			}
		}

	}
}