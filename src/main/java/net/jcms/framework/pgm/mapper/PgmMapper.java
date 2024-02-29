package net.jcms.framework.pgm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.pgm.model.Pgm;
import net.jcms.framework.pgm.model.PgmSearch;

@Mapper (value="pgmMapper")
public interface PgmMapper extends BaseMapper<Pgm, PgmSearch> {
	
}
