package net.pm.service;

import net.jcms.framework.base.service.BaseService;
import net.pm.model.PmAccSearch;
import net.pm.model.PmAcdntRcptInfo;

import java.util.List;

public interface PmAccService extends BaseService<PmAcdntRcptInfo, PmAccSearch> {
    List<String> selectAccTypes();
    List<String> selectOpers();
    List<String> selectPmKinds();
    List<String> selectSex();
    List<String> selectSpot();
}
