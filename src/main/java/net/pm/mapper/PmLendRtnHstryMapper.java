package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.pm.dto.PmLendRtnHstryRequestDto;
import net.pm.model.PmLendRtnHstry;

import java.util.List;

@Mapper(value = "pmLendRtnHstryMapper")
public interface PmLendRtnHstryMapper {
    int insertPmLendRtnHstry(List<PmLendRtnHstry> pmLendRtnHstryList);

    int countPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
    List<PmLendRtnHstry> selectPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
    List<PmLendRtnHstry> selectPmLendRtnHstryList(PmLendRtnHstry pmLendRtnHstry);

    void updateFCFWParking();
    void updateBUSParking();
    void updateSHBParking();
    void updatePDCRParking();
    void updateCROSParking();
}
