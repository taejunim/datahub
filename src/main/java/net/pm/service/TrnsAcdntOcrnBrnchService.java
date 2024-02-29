package net.pm.service;

import net.jcms.framework.base.service.BaseService;
import net.pm.model.AcdntRcptInfo;

public interface TrnsAcdntOcrnBrnchService extends BaseService<AcdntRcptInfo, AcdntRcptInfo> {
    void updateAcdntRcptInfo();
}
