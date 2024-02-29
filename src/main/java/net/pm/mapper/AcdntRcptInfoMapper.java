package net.pm.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.pm.model.AcdntRcptInfo;

@Mapper(value="acdntRcptInfoMapper")
public interface AcdntRcptInfoMapper extends BaseMapper<AcdntRcptInfo, AcdntRcptInfo> {
    String selectLastId();
    String selectInfoLastId();
    String selectSpotLastId();
}