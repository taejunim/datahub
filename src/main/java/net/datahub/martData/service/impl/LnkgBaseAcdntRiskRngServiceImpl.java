package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.LnkgBaseAcdntRiskRngMapper;
import net.datahub.martData.model.LnkgBaseAcdntRiskRng;
import net.datahub.martData.service.LnkgBaseAcdntRiskRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="lnkgBaseAcdntRiskRngService")
public class LnkgBaseAcdntRiskRngServiceImpl extends BaseServiceImpl<LnkgBaseAcdntRiskRng, LnkgBaseAcdntRiskRng, LnkgBaseAcdntRiskRngMapper> implements LnkgBaseAcdntRiskRngService {
	@Override
	@Resource(name="lnkgBaseAcdntRiskRngMapper")
	protected void setMapper (LnkgBaseAcdntRiskRngMapper mapper) {
		super.setMapper (mapper);
	}
}