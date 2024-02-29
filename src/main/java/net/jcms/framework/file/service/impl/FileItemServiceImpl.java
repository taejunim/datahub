package net.jcms.framework.file.service.impl;

import java.io.File;

import javax.annotation.Resource;

import net.jcms.framework.util.PropertiesUtil;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.file.mapper.FileItemMapper;
import net.jcms.framework.file.model.FileItem;
import net.jcms.framework.file.model.FileItemSearch;
import net.jcms.framework.file.service.FileItemService;

@Service(value="fileItemService")
public class FileItemServiceImpl extends BaseServiceImpl<FileItem, FileItemSearch, FileItemMapper> implements FileItemService {
	
	@Override
	@Resource (name="fileItemMapper")
	protected void setMapper (FileItemMapper mapper) {
		super.setMapper (mapper);
	}

	@Override
	public void delete(FileItem fileItem) {
		File file = new File(fileItem.getSavePath()+fileItem.getSaveFileNm());
		if(file.exists()) file.delete();

		if(MediaType.IMAGE_GIF_VALUE.equals(fileItem.getMediaTp())
				|| MediaType.IMAGE_JPEG_VALUE.equals(fileItem.getMediaTp())
				|| MediaType.IMAGE_PNG_VALUE.equals(fileItem.getMediaTp())) {
			//이미지파일일 경우 썸네일이미지도 같이 삭제한다.
			String imgPath = fileItem.getSavePath()+ PropertiesUtil.getProperty("AppConf.filePath.thumb")+fileItem.getSaveFileNm()+PropertiesUtil.getProperty("AppConf.fileNm.thumb");
			imgPath = imgPath.replaceAll("\\.{2,}[/\\\\]", "");
			file = new File(imgPath);
			if(file.exists()) file.delete();
		}
		super.delete(fileItem);
	}

	@Override
	public void updateFileId(FileItem fileItem) {
		mapper.updateFileId(fileItem);
	}

	@Override
	public void updateDwnCnt(Long itemId) {
		mapper.updateDwnCnt(itemId);
	}
}
