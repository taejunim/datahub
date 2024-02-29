package net.pm.service;

import net.jcms.framework.base.service.BaseService;
import net.pm.model.PmDrivingSearch;
import net.pm.model.PmLendRtnHstry;

import java.util.List;

public interface PmDrivingService  extends BaseService<PmLendRtnHstry, PmDrivingSearch> {
    List<String> selectOpers();

}
