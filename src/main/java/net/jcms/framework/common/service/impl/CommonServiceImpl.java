package net.jcms.framework.common.service.impl;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.service.impl.BaseServiceImpl;
import net.jcms.framework.common.mapper.CommonMapper;
import net.jcms.framework.common.model.Common;
import net.jcms.framework.common.model.CommonSearch;
import net.jcms.framework.common.service.CommonService;
import net.jcms.framework.security.model.User;
import net.jcms.framework.security.model.UserRole;
import net.jcms.framework.security.service.UserRoleService;
import net.jcms.framework.util.PropertiesUtil;
import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Slf4j
@Service(value = "commonService")
public class CommonServiceImpl extends BaseServiceImpl<Common, CommonSearch, CommonMapper> implements CommonService {
    @Autowired
    private UserRoleService userRoleService;

    @Override
    @Resource(name = "commonMapper")
    protected void setMapper(CommonMapper mapper) {
        super.setMapper(mapper);
    }

    public String createExcel(HttpServletRequest request, HttpServletResponse response, List<Map<String, Object>> dataList, String[] title, String[] cont, int[] width) {
        Row row = null;
        Cell cell = null;
        int rowIdx = 0;

        XSSFWorkbook xlsWb = new XSSFWorkbook(); //xlsx
//		HSSFWorkbook xlsWb = new HSSFWorkbook(); //xls
        Sheet sheet1 = xlsWb.createSheet("데이터"); //시트명 설정

        CellStyle headStyle = xlsWb.createCellStyle();
        headStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        headStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        headStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        headStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        headStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        headStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);

        CellStyle dataStyle = xlsWb.createCellStyle();
        dataStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        dataStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        dataStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        dataStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        dataStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        row = sheet1.createRow(rowIdx++);

        for (int i = 0; i < title.length; i++) {
            if (width == null) {
                sheet1.setColumnWidth(i, 5000);
            } else {
                sheet1.setColumnWidth(i, width[i]);
            }

            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(headStyle); // 셀 스타일 적용
        }

        int cellIdx = 0;
        for (int i = 0; i < dataList.size(); i++) {
            cellIdx = 0;
            Map<String, Object> dataMap = (Map<String, Object>) dataList.get(i);
            row = sheet1.createRow(rowIdx++);

            //data 출력하기
            for (int j = 0; j < cont.length; j++) {
                cell = row.createCell(cellIdx);
                cell.setCellStyle(dataStyle); // 셀 스타일 적용

                String data = "";
                if (cellIdx == 0) {
                    data = String.valueOf(i+1);
                } else if (dataMap.get(cont[j]) != null) {
                    data = dataMap.get(cont[j]).toString();
                }

                cell.setCellValue(data);
                cellIdx++;
            }
        }

        // excel 파일 저장
        String fileName = UUID.randomUUID().toString();
        try {
            String path = PropertiesUtil.getProperty("AppConf.filePath.excel");
            File folder = new File(path);

            // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
            if (!folder.exists()) {
                try {
                    folder.mkdirs(); //폴더 생성합니다.
                } catch (RuntimeException e) {
                    log.error("RuntimeException", e);
                }
            }

            OutputStream fileOut = Files.newOutputStream(Paths.get(path + fileName));
            xlsWb.write(fileOut);
        } catch (FileNotFoundException e) {
            log.error("FileNotFoundException", e);
        } catch (IOException e) {
            log.error("IOException", e);
        }
        return fileName;
    }

    public void download(HttpServletResponse response, String path, String fileName, String fileDownName) {
        byte fileByte[];
        try {
            fileByte = FileUtils.readFileToByteArray(new File(path + fileName));
            response.setContentType("application/octet-stream");
            response.setContentLength(fileByte.length);
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(fileDownName + ".xlsx", "UTF-8") + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.getOutputStream().write(fileByte);
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (IOException e) {
            log.error("IOException", e);
        }
    }

    /* 현제 접속자 정보 return */
    public static User getUserInfo() {
        if ("anonymousUser".equals(EgovUserDetailsHelper.getAuthenticatedUser())) return null;

        User user = (User) EgovUserDetailsHelper.getAuthenticatedUser();
        if (user != null) {
            return user;
        }

        return null;
    }

    /* 현제 접속자 Ip주소 return */
    public static String getClientIp() {
        HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ip = req.getHeader("X-FORWARDED-FOR");
        if (ip == null)
            ip = req.getRemoteAddr();
        return ip;
    }

    /* 넘어온 모든 parameter값 Map형식으로 저장 */
    public Map<String, Object> getParameterMap(HttpServletRequest request) {

        Map<String, Object> parameterMap = new HashMap<String, Object>();

        User user = getUserInfo();
        String clientIp = getClientIp();

        String serverKey = PropertiesUtil.getProperty("Globals.minwon.serverKey");
        parameterMap.put("serverKey", serverKey);

        UserRole userRole = new UserRole();

        if (user != null) {
            parameterMap.put("userId", user.getUserId());
            parameterMap.put("userNm", user.getUserNm());
            parameterMap.put("userNum", user.getUserId());

            userRole.setUserId(user.getUserId());

            UserRole userRoleData = userRoleService.select(userRole);

            parameterMap.put("userRole", userRoleData.getRoleAuth());
            parameterMap.put("userRoleNm", userRoleData.getRoleNm());
        } else {
            parameterMap.put("userId", null);
            parameterMap.put("userNm", null);
            parameterMap.put("userNum", null);
        }

        List<UserRole> menuRoleList = userRoleService.selectRoleList(userRole);
        parameterMap.put("menuRoleList", menuRoleList);

        parameterMap.put("clientIp", clientIp);

        Enumeration enums = request.getParameterNames();
        while (enums.hasMoreElements()) {
            String paramName = (String) enums.nextElement();
            String[] parameters = request.getParameterValues(paramName);

            // Parameter가 배열일 경우
            if (parameters.length > 1) {
                parameterMap.put(paramName, parameters);
                // Parameter가 배열이 아닌 경우
            } else {
                parameterMap.put(paramName, parameters[0]);
            }
        }
        return parameterMap;
    }

    @Override
    public Map<String, Object> selectSiteImgFileUpload(MultipartHttpServletRequest multi) {
        Map<String, Object> fileMap = new HashedMap<>();

        Iterator<String> files = multi.getFileNames();

        String filePath = PropertiesUtil.getProperty("AppConf.filePath.image");

        File folderFront = new File(filePath);

        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
        if (!folderFront.exists()) {
            try {
                folderFront.mkdirs(); //폴더 생성합니다.
            } catch (RuntimeException e) {
                log.error("RuntimeException", e);
            }
        } else {
        }

        String path = filePath + '/';

        while (files.hasNext()) {
            String uploadFile = files.next();
            MultipartFile mFile = multi.getFile(uploadFile);
            String fileName = mFile.getOriginalFilename();
            fileMap.put(uploadFile, null);
            if (!fileName.equals("")) {
                String realFileNm = UUID.randomUUID().toString().substring(0, 15);
                String fe = "";
                int i = fileName.lastIndexOf('.');
                if (i > 0) {
                    fe = fileName.substring(i + 1);
                }

                fileMap.put(uploadFile, realFileNm + "." + fe);
                try {
                    mFile.transferTo(new File(path + realFileNm + "." + fe));
                } catch (RuntimeException e) {
                    log.error("RuntimeException", e);
                } catch (IOException e) {
                    log.error("IOException", e);
                }
            }
        }
        return fileMap;
    }

    @Override
    public void insertLayer(MultipartHttpServletRequest multi) {
        try {
            Iterator<String> files = multi.getFileNames();

            Map<String, Object> parmaMap = new HashedMap<>();

            while (files.hasNext()) {
                String uploadFile = files.next();
                MultipartFile mFile = multi.getFile(uploadFile);

                OPCPackage opcPackage = OPCPackage.open(mFile.getInputStream());
                XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

                // 첫번째 시트 불러오기
                XSSFSheet sheet = workbook.getSheetAt(0);

                for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {

                    XSSFRow row = sheet.getRow(i);

                    // 행이 존재하기 않으면 패스
                    if (null == row) {
                        continue;
                    }

                    // 시리얼번호
                    XSSFCell cell = row.getCell(0);
                    if (null != cell) {
                        String data = tranCell(cell);
                        parmaMap.put("sn", data);
                    } else {
                        continue;
                    }

                    //x좌표
                    cell = row.getCell(1);
                    if (null != cell) {
                        double data = cell.getNumericCellValue();
                        parmaMap.put("xCrdnt", data);
                    } else {
                        continue;
                    }

                    //y좌표
                    cell = row.getCell(2);
                    if (null != cell) {
                        double data = cell.getNumericCellValue();
                        parmaMap.put("yCrdnt", data);
                    } else {
                        continue;
                    }

                    //구분
                    cell = row.getCell(3);
                    if (null != cell) {
                        String data = tranCell(cell);
                        parmaMap.put("gbn", data);
                    } else {
                        continue;
                    }

                    mapper.insertLayer(parmaMap);
                }
            }
        } catch (RuntimeException e) {
            log.error("RuntimeException", e);
        } catch (InvalidFormatException e) {
            log.error("InvalidFormatException", e);
        } catch (IOException e) {
            log.error("IOException", e);
        }
    }


    public String tranCell(XSSFCell cell) {
        String result = null;
        switch (cell.getCellType()) {
            case XSSFCell.CELL_TYPE_FORMULA:
                result = cell.getCellFormula();
                break;
            case XSSFCell.CELL_TYPE_NUMERIC: // 데이터 타입이 숫자.
                Integer i = (int) cell.getNumericCellValue(); // 리턴타입이 double 임. integer로 형변환 해주고
                result = i.toString(); // integer 로 형변환된 값을 String 으로 받아서 value값에 넣어준다.
                break;
            case XSSFCell.CELL_TYPE_STRING:
                result = cell.getStringCellValue();
                break;
            case XSSFCell.CELL_TYPE_BLANK:
                result = null;
                break;
            case XSSFCell.CELL_TYPE_ERROR:
                result = null;
                break;
        }
        return result;
    }

    @Override
    public List<Map<String, Object>> addrSelect(CommonSearch commonSearch) {
        return mapper.addrSelect(commonSearch);
    }

    @Override
    public List<Map<String, Object>> selectLyrList() {
        return mapper.selectLyrList();
    }
}

