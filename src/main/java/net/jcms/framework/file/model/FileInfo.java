package net.jcms.framework.file.model;

import java.util.List;

import net.jcms.framework.base.model.BaseModel;

public class FileInfo extends BaseModel{

	private Long fileId;
	
	public List<FileItem> fileList;

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

}
