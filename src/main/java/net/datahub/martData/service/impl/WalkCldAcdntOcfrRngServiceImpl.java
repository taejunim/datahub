package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.WalkCldAcdntOcfrRngMapper;
import net.datahub.martData.model.WalkCldAcdntOcfrRng;
import net.datahub.martData.service.WalkCldAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="walkCldAcdntOcfrRngService")
public class WalkCldAcdntOcfrRngServiceImpl extends BaseServiceImpl<WalkCldAcdntOcfrRng, WalkCldAcdntOcfrRng, WalkCldAcdntOcfrRngMapper> implements WalkCldAcdntOcfrRngService {
	@Override
	@Resource(name="walkCldAcdntOcfrRngMapper")
	protected void setMapper (WalkCldAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}