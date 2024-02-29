package net.datahub.martData.service.impl;

import net.datahub.martData.mapper.SchzoneCldAcdntOcfrRngMapper;
import net.datahub.martData.model.SchzoneCldAcdntOcfrRng;
import net.datahub.martData.service.SchzoneCldAcdntOcfrRngService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="schzoneCldAcdntOcfrRngService")
public class SchzoneCldAcdntOcfrRngServiceImpl extends BaseServiceImpl<SchzoneCldAcdntOcfrRng, SchzoneCldAcdntOcfrRng, SchzoneCldAcdntOcfrRngMapper> implements SchzoneCldAcdntOcfrRngService {
	@Override
	@Resource(name="schzoneCldAcdntOcfrRngMapper")
	protected void setMapper (SchzoneCldAcdntOcfrRngMapper mapper) {
		super.setMapper (mapper);
	}
}