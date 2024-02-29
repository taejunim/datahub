package net.jcms.framework.pgm.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.pgm.mapper.PgmMapper;
import net.jcms.framework.pgm.model.Pgm;
import net.jcms.framework.pgm.model.PgmSearch;
import net.jcms.framework.pgm.service.PgmService;

@Service(value="pgmService")
public class PgmServiceImpl extends BaseServiceImpl<Pgm, PgmSearch, PgmMapper> implements PgmService {

	@Override
	@Resource (name="pgmMapper")
	protected void setMapper (PgmMapper mapper) {
		super.setMapper (mapper);
	}	
}
