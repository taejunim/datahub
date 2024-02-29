package net.jcms.framework.file.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.file.mapper.FileMapper;
import net.jcms.framework.file.model.FileInfo;
import net.jcms.framework.file.model.FileItem;
import net.jcms.framework.file.model.FileItemSearch;
import net.jcms.framework.file.model.FileSearch;
import net.jcms.framework.file.service.FileItemService;
import net.jcms.framework.file.service.FileService;

@Service(value="fileService")
public class FileServiceImpl extends BaseServiceImpl<FileInfo, FileSearch, FileMapper> implements FileService {

	@Resource (name="fileItemService")
	private FileItemService fileItemService;
	
	@Override
	@Resource (name="fileMapper")
	protected void setMapper (FileMapper mapper) {
		super.setMapper (mapper);
	}

	@Override
	public FileInfo select(FileSearch fileSearch) {
		FileInfo file = super.select(fileSearch);
		FileItemSearch fileItemSearch = new FileItemSearch();
		fileItemSearch.setFileId(file.getFileId());
		file.fileList = fileItemService.selectList(fileItemSearch);
		return file;
	}
	
	@Override
	public void deleteFileItem(Long fileId) {
		FileItemSearch fileItemSearch = new FileItemSearch();
		fileItemSearch.setFileId(fileId);
		List<FileItem> fileItemList = fileItemService.selectList(fileItemSearch);
		for(FileItem fileItem : fileItemList) {
			fileItemService.delete(fileItem);
		}
	}

}
