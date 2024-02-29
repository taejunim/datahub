package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.TwhAcdntOcfrRngMapper;
import net.datahub.martData.model.TwhAcdntOcfrRng;
import net.datahub.martData.service.TwhAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="twhAcdntOcfrRngService")
public class TwhAcdntOcfrRngServiceImpl extends BaseServiceImpl<TwhAcdntOcfrRng, TwhAcdntOcfrRng, TwhAcdntOcfrRngMapper> implements TwhAcdntOcfrRngService {
	@Override
	@Resource(name="twhAcdntOcfrRngMapper")
	protected void setMapper (TwhAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}