package net.pm.service;

import net.pm.dto.PmLendRtnHstryGraphResponseDto;
import net.pm.dto.PmLendRtnHstryRequestDto;
import net.pm.dto.PmLendRtnHstryTimeBasedUsageResponseDto;
import net.pm.model.PmLendRtnHstry;

import java.util.List;

public interface PmLendRtnHstryService {

    int countPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
    List<PmLendRtnHstry> selectPmLendRtnHstryListByFilter(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
    List<PmLendRtnHstry> selectPmLendRtnHstryList(PmLendRtnHstry pmLendRtnHstry);
    PmLendRtnHstryGraphResponseDto getOverallPmLendRtnHstryStat(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
    void setParking();
    PmLendRtnHstryTimeBasedUsageResponseDto getPolygonInfo(PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto);
}
