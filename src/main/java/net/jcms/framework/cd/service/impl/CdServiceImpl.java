package net.jcms.framework.cd.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.cd.mapper.CdMapper;
import net.jcms.framework.cd.model.Cd;
import net.jcms.framework.cd.service.CdService;

@Service(value="cdService")
public class CdServiceImpl extends BaseServiceImpl<Cd, Cd, CdMapper> implements CdService{

		@Override
		@Resource (name="cdMapper")
		protected void setMapper (CdMapper mapper) {
			super.setMapper(mapper);
		}

		@Override
		public Integer existCount(Cd cd) {
			return mapper.existCount(cd);
		}

}
