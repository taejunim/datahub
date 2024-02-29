package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.DthTrnsAcdntRngInfoMapper;
import net.datahub.martData.model.DthTrnsAcdntRngInfo;
import net.datahub.martData.service.DthTrnsAcdntRngInfoService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="dthTrnsAcdntRngInfoService")
public class DthTrnsAcdntRngInfoServiceImpl extends BaseServiceImpl<DthTrnsAcdntRngInfo, DthTrnsAcdntRngInfo, DthTrnsAcdntRngInfoMapper> implements DthTrnsAcdntRngInfoService {
	@Override
	@Resource(name="dthTrnsAcdntRngInfoMapper")
	protected void setMapper (DthTrnsAcdntRngInfoMapper mapper) {
		super.setMapper (mapper);
	}
}