package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.pm.dto.PmAcdntRcptInfoRequestDto;
import net.pm.model.PmAcdntRcptInfo;

import java.util.List;

@Mapper(value = "pmAcdntRcptInfoMapper")
public interface PmAcdntRcptInfoMapper extends BaseMapper<PmAcdntRcptInfo, PmAcdntRcptInfoRequestDto> {
    int countPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
    List<PmAcdntRcptInfo> selectPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
    List<PmAcdntRcptInfo> selectGraphPmAcdntRcptInfoListByFilter(PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto);
    List<PmAcdntRcptInfo> selectPmAcdntRcptInfoList(PmAcdntRcptInfo pmAcdntRcptInfo);
}
