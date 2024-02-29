package net.pm.service;

import net.jcms.framework.base.service.BaseService;
import net.pm.model.LendRtnHstry;

public interface LendRtnHstryService extends BaseService<LendRtnHstry, LendRtnHstry> {
    String selectLastId();

    void updateLendRtnHstry();
}