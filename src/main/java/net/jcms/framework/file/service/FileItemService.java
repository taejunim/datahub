package net.jcms.framework.file.service;

import net.jcms.framework.base.service.BaseService;
import net.jcms.framework.file.model.FileItem;
import net.jcms.framework.file.model.FileItemSearch;

public interface FileItemService extends BaseService<FileItem, FileItemSearch> {

	void updateFileId(FileItem fileItem);
	
	void updateDwnCnt(Long itemId);
	
}
