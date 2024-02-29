package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.BcclAcdntOcfrRngMapper;
import net.datahub.martData.model.BcclAcdntOcfrRng;
import net.datahub.martData.service.BcclAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="bcclAcdntOcfrRngService")
public class BcclAcdntOcfrRngServiceImpl extends BaseServiceImpl<BcclAcdntOcfrRng, BcclAcdntOcfrRng, BcclAcdntOcfrRngMapper> implements BcclAcdntOcfrRngService {
	@Override
	@Resource(name="bcclAcdntOcfrRngMapper")
	protected void setMapper (BcclAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}