package net.datahub.martLendRtnHstry.service.impl;

import net.datahub.martLendRtnHstry.mapper.MartLendRtnHstryMapper;
import net.datahub.martLendRtnHstry.model.MartLendRtnHstry;
import net.datahub.martLendRtnHstry.service.MartLendRtnHstryService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="martLendRtnHstryService")
public class MartLendRtnHstryServiceImpl extends BaseServiceImpl<MartLendRtnHstry, MartLendRtnHstry, MartLendRtnHstryMapper> implements MartLendRtnHstryService {
	@Override
	@Resource(name="martLendRtnHstryMapper")
	protected void setMapper (MartLendRtnHstryMapper mapper) {
		super.setMapper (mapper);
	}
}