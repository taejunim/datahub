package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.PdsAcdntOcfrRngMapper;
import net.datahub.martData.model.PdsAcdntOcfrRng;
import net.datahub.martData.service.PdsAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="pdsAcdntOcfrRngService")
public class PdsAcdntOcfrRngServiceImpl extends BaseServiceImpl<PdsAcdntOcfrRng, PdsAcdntOcfrRng, PdsAcdntOcfrRngMapper> implements PdsAcdntOcfrRngService {
	@Override
	@Resource(name="pdsAcdntOcfrRngMapper")
	protected void setMapper (PdsAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}