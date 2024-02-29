package net.tv.protectionZone.web;

import net.jcms.framework.util.PropertiesUtil;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.tv.protectionZone.model.SpeedDecisionMaking;
import net.tv.protectionZone.service.SpeedDecisionMakingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * packageName    : net.tv.protectionZone.web
 * fileName       : SpeedDecisionMakingController
 * author         : tjlim
 * date           : 2023/06/01
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023/06/01        tjlim       최초 생성
 */
@Controller
public class SpeedDecisionMakingController {

    @Autowired
    ServletContext context;

    @Inject
    private SpeedDecisionMakingService speedDecisionMakingService;

    @RequestMapping(value = "/tv/protectionZone/getChartData.json", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getChartData(@RequestBody SpeedDecisionMaking speedDecisionMaking) {
        Map<String, Object> result = new HashMap<String, Object>();

        result.put("result", speedDecisionMakingService.getChartData(speedDecisionMaking));

        return result;
    }
    @RequestMapping(value = "/tv/protectionZone/speedDecisionMakingReport.mng", method = RequestMethod.POST)
    public void  speedDecisionMakingReport(HttpServletRequest request, HttpServletResponse response) {

        Connection conn = null;

        try {
            String dbUrl = PropertiesUtil.getProperty("AppConf.db.Url2");
            String dbUserId = PropertiesUtil.getProperty("AppConf.db.UserName2");
            String dbPw = PropertiesUtil.getProperty("AppConf.db.Password2");

            Class.forName("org.postgresql.Driver");
            // JASPER DB CONNECTION
            conn = DriverManager.getConnection(dbUrl, dbUserId, dbPw);
            JasperReport jasperReport = null;
            JasperDesign jasperDesign = null;

            Map<String, Object> parameters = new HashMap<String, Object>();
            parameters.put("Parameter_Address", request.getParameter("address"));
            parameters.put("Parameter_TrafficTime", request.getParameter("trafficTime"));
            parameters.put("Parameter_ReportDate", new SimpleDateFormat("yyyy년 MM월 dd일").format(new Date()));

            //시설물 정보
            parameters.put("Parameter_CctvCount", request.getParameter("cctvCount"));
            parameters.put("Parameter_CrossWalkCount", request.getParameter("crossWalkCount"));
            parameters.put("Parameter_CrossRoadCount", request.getParameter("crossRoadCount"));
            parameters.put("Parameter_ChildPickupZoneCount", request.getParameter("childPickupZoneCount"));
            parameters.put("Parameter_ChildWaySchoolCount", request.getParameter("childWaySchoolCount"));
            parameters.put("Parameter_OneWayRoadCount", request.getParameter("oneWayRoadCount"));
            parameters.put("Parameter_SpeedBumpCount", request.getParameter("speedBumpCount"));

            //String[] parameterNameArray = {"speedChartImage", "trafficChartImage"};
            String[] parameterNameArray = {
                    "capture0",  "capture1",  "capture2",  "capture3", "capture4"
            };

            for (int i=0; i<parameterNameArray.length; i++) {
                String imageString = request.getParameter(parameterNameArray[i]); //통행 시간대별 통행량 차트 이미지 String

                String base64Image = imageString.toString().split(",")[1];
                byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
                BufferedImage trafficChartImage = ImageIO.read(new ByteArrayInputStream(imageBytes));

                parameters.put("Parameter_"+parameterNameArray[i]+"_Image", trafficChartImage);
            }

            String path = context.getRealPath("/WEB-INF/");
            jasperDesign = JRXmlLoader.load(path + "/report/SpeedDecisionMakingReport.jrxml"); //보고서 생성
            jasperReport = JasperCompileManager.compileReport(jasperDesign); //보고서 컴파일

            //PDF형식으로 변환
            byte[] byteStream = JasperRunManager.runReportToPdf(jasperReport, parameters, conn);
            OutputStream outStream = response.getOutputStream();
            response.setContentType("application/pdf");
            response.setContentLength(byteStream.length);

            outStream.write(byteStream, 0, byteStream.length);
            outStream.flush();

        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            System.out.println("ClassNotFoundException Occured");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            System.out.println("SQLException Occured");
        } catch (JRException e) {
            // TODO Auto-generated catch block
            System.out.println("JRException Occured");
        } catch (IOException e) {
            System.out.println("IOException Occured");
        }finally {
            if(conn != null){ try { conn.close(); } catch (SQLException e){ System.err.println("SQLException? occured"); }}
        }
    }
}
