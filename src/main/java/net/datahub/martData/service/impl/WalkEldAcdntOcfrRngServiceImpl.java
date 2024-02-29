package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.WalkEldAcdntOcfrRngMapper;
import net.datahub.martData.model.WalkEldAcdntOcfrRng;
import net.datahub.martData.service.WalkEldAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="walkEldAcdntOcfrRngService")
public class WalkEldAcdntOcfrRngServiceImpl extends BaseServiceImpl<WalkEldAcdntOcfrRng, WalkEldAcdntOcfrRng, WalkEldAcdntOcfrRngMapper> implements WalkEldAcdntOcfrRngService {
	@Override
	@Resource(name="walkEldAcdntOcfrRngMapper")
	protected void setMapper (WalkEldAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}