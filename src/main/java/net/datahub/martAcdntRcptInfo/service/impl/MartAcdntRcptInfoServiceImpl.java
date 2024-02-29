package net.datahub.martAcdntRcptInfo.service.impl;

import net.datahub.martAcdntRcptInfo.mapper.MartAcdntRcptInfoMapper;
import net.datahub.martAcdntRcptInfo.model.MartAcdntRcptInfo;
import net.datahub.martAcdntRcptInfo.service.MartAcdntRcptInfoService;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value="martAcdntRcptInfoService")
public class MartAcdntRcptInfoServiceImpl extends BaseServiceImpl<MartAcdntRcptInfo, MartAcdntRcptInfo, MartAcdntRcptInfoMapper> implements MartAcdntRcptInfoService {
	@Override
	@Resource(name="martAcdntRcptInfoMapper")
	protected void setMapper (MartAcdntRcptInfoMapper mapper) {
		super.setMapper (mapper);
	}
}