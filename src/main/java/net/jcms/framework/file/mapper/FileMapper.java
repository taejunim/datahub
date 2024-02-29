package net.jcms.framework.file.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.file.model.FileInfo;
import net.jcms.framework.file.model.FileSearch;

@Mapper (value="fileMapper")
public interface FileMapper extends BaseMapper<FileInfo, FileSearch> {
	
}
