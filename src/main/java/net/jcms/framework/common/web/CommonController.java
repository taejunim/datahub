package net.jcms.framework.common.web;

import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.common.model.CommonSearch;
import net.jcms.framework.common.service.CommonService;
import net.jcms.framework.util.PropertiesUtil;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/common/")
public class CommonController extends BaseController {
    @Resource(name = "commonService")
    private CommonService commonService;

    public static String getCurrentDay(String pattern) {
        SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat(pattern, Locale.KOREA);
        Date currentTime = new Date();
        String mTime = mSimpleDateFormat.format(currentTime);
        return mTime;
    }

    @RequestMapping("downloadExcel.json")
    public void downloadExcel(HttpServletRequest request, HttpServletResponse respons) {
        String path = PropertiesUtil.getProperty("AppConf.filePath.excel"); //경로
        commonService.download(respons, path, request.getParameter("excelFileName"), request.getParameter("excelFileDownName"));
    }

    @RequestMapping(value = "imgFileUpload.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectSiteImgFileUpload(HttpServletRequest request, MultipartHttpServletRequest multi) {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            Map<String, Object> imgFileId = commonService.selectSiteImgFileUpload(multi);
            result.put("imgFileId", imgFileId);
            result.put("result", "success");
        } catch (RuntimeException e) {
            result.put("result", "fail");
            result.put("message", e.getMessage());
        }
        return result;
    }

    /**
     * 사진 뷰어
     *
     * @param fileName
     * @param request
     * @return
     */
    @RequestMapping(value = "imgView.do", method = RequestMethod.GET)
    public ResponseEntity<byte[]> displayFile(@RequestParam("name") String fileName, HttpServletRequest request) {
        String path = PropertiesUtil.getProperty("AppConf.filePath.image");
        InputStream in = null;
        ResponseEntity<byte[]> entity = null;
        String fileNameNew = fileName;
        try {
            String formatName = fileNameNew.substring(fileNameNew.lastIndexOf(".") + 1);
            in = Files.newInputStream(Paths.get(path + fileNameNew));
            MediaType mType = null;
            if (formatName.equalsIgnoreCase("PNG")) {
                mType = MediaType.IMAGE_PNG;
            } else if (formatName.equalsIgnoreCase("JPG")) {
                mType = MediaType.IMAGE_JPEG;
            } else if (formatName.equalsIgnoreCase("GIF")) {
                mType = MediaType.IMAGE_GIF;
            }
            HttpHeaders headers = new HttpHeaders();

            if (mType != null) {
                headers.setContentType(mType);
            } else {
                fileNameNew = fileNameNew.substring(fileNameNew.indexOf("_") + 1);
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.add("Content-Disposition", "attachment; filename=\"" + new String(fileNameNew.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1) + "\"");
            }
            entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
        } catch (FileNotFoundException e) {
            entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        } catch (UnsupportedEncodingException e) {
            entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
            }
        }
        return entity;
    }

    @RequestMapping("downloadForm.do")
    public void downloadForm(HttpServletRequest request, HttpServletResponse response, Model model) {
        String path = PropertiesUtil.getProperty("AppConf.filePath.form");
        commonService.download(response, path, "layerUploadForm", "layerUploadForm");
    }

    @RequestMapping(value = "uploadForm.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadForm(HttpServletRequest request, MultipartHttpServletRequest multi) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            String gbn = PropertiesUtil.getProperty("AppConf.server.gbn");
            if (gbn.equals("oper")) {
                commonService.insertLayer(multi);
            }
            result.put("result", "success");
        } catch (RuntimeException e) {
            result.put("result", "fail");
            result.put("message", e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "addrSelect.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addrSelect(HttpServletRequest request, CommonSearch commonSearch) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            List<Map<String, Object>> data = commonService.addrSelect(commonSearch);
            result.put("data", data);
            result.put("result", "success");
        } catch (RuntimeException e) {
            result.put("result", "fail");
            result.put("message", e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "selectLyrList.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectLyrList(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            List<Map<String, Object>> lyrList = commonService.selectLyrList();
            result.put("lyrList", lyrList);
            result.put("result", "success");
        } catch (RuntimeException e) {
            result.put("result", "fail");
            result.put("message", e.getMessage());
        }
        return result;
    }
}