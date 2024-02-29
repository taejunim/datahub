package net.jcms.framework.cd.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.cd.mapper.CdClsMapper;
import net.jcms.framework.cd.model.CdCls;
import net.jcms.framework.cd.service.CdClsService;

@Service(value="cdClsService")
public class CdClsServiceImpl extends BaseServiceImpl<CdCls, CdCls, CdClsMapper> implements CdClsService{

	@Override
	@Resource (name="cdClsMapper")
	protected void setMapper (CdClsMapper mapper) {
		super.setMapper(mapper);
	}

	@Override
	public Integer existCount (CdCls cdCls) {
		return mapper.existCount (cdCls);
	}
}
