package net.jcms.framework.cd.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.cd.model.CdCls;

@Mapper (value="cdClsMapper")
public interface CdClsMapper extends BaseMapper<CdCls, CdCls>{
	Integer existCount (CdCls cdCls);
}
