package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.pm.model.LendRtnHstry;

@Mapper(value="lendRtnHstryMapper")
public interface LendRtnHstryMapper extends BaseMapper<LendRtnHstry, LendRtnHstry> {
    String selectLastId();
}