package net.datahub.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.model.PmLendRtnHstry;

import java.util.List;

@Mapper(value = "postgresPmLendRtnHstryMapper")
public interface PostgresPmLendRtnHstryMapper {
    List<PmLendRtnHstry> selectPostgresPmLendRtnHstryList();
}
