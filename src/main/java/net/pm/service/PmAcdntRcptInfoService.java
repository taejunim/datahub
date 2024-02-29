package net.pm.service;

import net.jcms.framework.base.service.BaseService;
import net.pm.dto.PmAcdntRcptInfoRequestDto;
import net.pm.dto.PmAcdntRcptInfoGraphResponseDto;
import net.pm.model.PmAcdntRcptInfo;

import java.util.List;

public interface PmAcdntRcptInfoService extends BaseService<PmAcdntRcptInfo, PmAcdntRcptInfoRequestDto> {
    int countPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
    List<PmAcdntRcptInfo> selectPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
    PmAcdntRcptInfoGraphResponseDto getOverallPmAcdntRcptInfoStat(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
}
