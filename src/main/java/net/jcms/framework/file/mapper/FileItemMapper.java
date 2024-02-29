package net.jcms.framework.file.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import net.jcms.framework.base.mapper.BaseMapper;
import net.jcms.framework.file.model.FileItem;
import net.jcms.framework.file.model.FileItemSearch;

@Mapper (value="fileItemMapper")
public interface FileItemMapper extends BaseMapper<FileItem, FileItemSearch> {
	
	int selectSerial(String fileId);

	void updateFileId(FileItem fileItem);
	
	void updateDwnCnt(Long itemId);
}
