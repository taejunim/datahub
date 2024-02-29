package net.pm.service.impl;

import lombok.extern.slf4j.Slf4j;
import net.datahub.martLendRtnHstry.model.MartLendRtnHstry;
import net.datahub.martLendRtnHstry.service.MartLendRtnHstryService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.pm.mapper.LendRtnHstryMapper;
import net.pm.model.LendRtnHstry;
import net.pm.service.LendRtnHstryService;
import net.pm.service.utils.GpsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service(value="lendRtnHstryService")
public class LendRtnHstryServiceImpl extends BaseServiceImpl<LendRtnHstry, LendRtnHstry, LendRtnHstryMapper> implements LendRtnHstryService {
	@Override
	@Resource(name="lendRtnHstryMapper")
	protected void setMapper (LendRtnHstryMapper mapper) {
		super.setMapper (mapper);
	}

	@Autowired
	private MartLendRtnHstryService martLendRtnHstryService;

	@Override
	public String selectLastId() {
		return mapper.selectLastId();
	}

	@Override
	public void updateLendRtnHstry() {
		try {
			String last_id = selectLastId();
			MartLendRtnHstry srch = new MartLendRtnHstry();
			String idx = null;
			if(last_id!=null) {
				String[] buff = last_id.split(LendRtnHstry.idSplitter);
				if(buff.length > 1) {
					try {
						Date sd = LendRtnHstry.sdf.parse(buff[0]);
						srch.setCrtDt(new Timestamp(sd.getTime()));
						idx = buff[1];
					} catch (RuntimeException e) {}
				}
			}
			List<MartLendRtnHstry> rst = martLendRtnHstryService.selectList(srch);
			insertLendRtnHstry(rst, idx);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	private void insertLendRtnHstry(List<MartLendRtnHstry> datas, String lastId) {
		if(datas==null || datas.size()<1) return;
		long idx = 0;
		if(lastId != null) {
			idx = Long.parseLong(lastId);
		}

		// List<LendRtnHstry> n_list = new ArrayList<>();
		for(MartLendRtnHstry item : datas) {
			try {
				LendRtnHstry lendRtnHstry = new LendRtnHstry(item, ++idx);
				lendRtnHstry.setRentSpot(GpsUtil.cvtCoordToAddrRegion3(item.getLendBrnch()));
				lendRtnHstry.setReturnSpot(GpsUtil.cvtCoordToAddrRegion3(item.getRtnBrnch()));
				mapper.insert(lendRtnHstry);
			} catch (Exception e) {
				log.error(e.getMessage());
			}
		}

	}

}