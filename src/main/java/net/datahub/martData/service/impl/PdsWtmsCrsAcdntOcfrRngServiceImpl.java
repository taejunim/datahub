package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.PdsWtmsCrsAcdntOcfrRngMapper;
import net.datahub.martData.model.PdsWtmsCrsAcdntOcfrRng;
import net.datahub.martData.service.PdsWtmsCrsAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="pdsWtmsCrsAcdntOcfrRngService")
public class PdsWtmsCrsAcdntOcfrRngServiceImpl extends BaseServiceImpl<PdsWtmsCrsAcdntOcfrRng, PdsWtmsCrsAcdntOcfrRng, PdsWtmsCrsAcdntOcfrRngMapper> implements PdsWtmsCrsAcdntOcfrRngService {
	@Override
	@Resource(name="pdsWtmsCrsAcdntOcfrRngMapper")
	protected void setMapper (PdsWtmsCrsAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}