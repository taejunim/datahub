package net.pm.web;

import lombok.extern.slf4j.Slf4j;
import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.common.service.CommonService;
import net.pm.dto.*;
import net.pm.model.PmDrivingSearch;
import net.pm.model.PmLendRtnHstry;
import net.pm.service.PmDrivingService;
import net.pm.service.PmLendRtnHstryService;
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequestMapping(value="/pm/driving")
public class PmLendRtnHstryController extends BaseController {

    @Autowired
    private PmLendRtnHstryService pmLendRtnHstryService;
    @Autowired
    private PmDrivingService pmDrivingService;

    @Autowired
    private CommonService commonService;

    @RequestMapping(value = "/list.mng", method = RequestMethod.GET)
    public String drivingList(Model model) {
        log.debug("drivingList Controller starts!");
        List<String> operators = pmDrivingService.selectOpers();
        model.addAttribute("operators", operators);
        return "pm/driving/list";
    }

    @ResponseBody
    @RequestMapping(value = "/getOverallPmLendRtnHstryList.json", method = RequestMethod.POST)
    public DataTableDto getOverallPmLendRtnHstryList(HttpServletRequest request, @RequestBody MultiValueMap<String, String> formData) throws ParseException {
        log.debug("getOverallPmLendRtnHstryList Controller starts!");

        String pattern = "yyyy-MM-dd HH:mm:ss";

        String startDt = formData.get("startSearchDt").get(0);
        String endDt = formData.get("endSearchDt").get(0);
        String operator = formData.get("operator").get(0);
        String retf = formData.get("retf").get(0);
        String isIPChecked = formData.get("isIPChecked").get(0);
        Integer start = formData.get("start") == null ? null : Integer.valueOf(formData.get("start").get(0));
        Integer length = formData.get("length") == null ? null : Integer.valueOf(formData.get("length").get(0));

        Timestamp startDateTimestamp = null;
        Timestamp endDateTimestamp = null;

        if (startDt != null && !startDt.isEmpty() && endDt != null && !endDt.isEmpty()) {
            DateFormat dateFormat = new SimpleDateFormat(pattern);

            Date startDate = dateFormat.parse(startDt);
            Date endDate = dateFormat.parse(endDt);

            startDateTimestamp = new Timestamp(startDate.getTime());
            endDateTimestamp = new Timestamp(endDate.getTime());
        }

        String sort = request.getParameter("columns[" + request.getParameter("order[0][column]") + "][name]");
        String sortOder = request.getParameter("order[0][dir]");

        PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto = PmLendRtnHstryRequestDto.builder()
                .sort(sort)
                .sortOrd(sortOder)
                .pagingYn(true)
                .start(start)
                .length(length)
                .operator(operator)
                .retf(retf)
                .isIPChecked(Boolean.parseBoolean(isIPChecked))
                .startSearchDt(startDateTimestamp)
                .endSearchDt(endDateTimestamp)
                .build();

        List<PmLendRtnHstry> pmLendRtnHstryList = pmLendRtnHstryService.selectPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);
        int total = pmLendRtnHstryService.countPmLendRtnHstryListByFilter(pmLendRtnHstryRequestDto);

        return DataTableDto.builder()
                .list(pmLendRtnHstryList)
                .total(total)
                .build();
    }

    @ResponseBody
    @RequestMapping(value = "/getOverallPmLendRtnHstryStat.json", method = RequestMethod.POST)
    public PmLendRtnHstryGraphResponseDto getOverallPmLendRtnHstryStat(@RequestBody MultiValueMap<String, String> formData) throws ParseException {
        log.debug("getOverallPmLendRtnHstryStat Controller starts!");

        String pattern = "yyyy-MM-dd HH:mm:ss";

        String startDt = formData.get("startSearchDt").get(0);
        String endDt = formData.get("endSearchDt").get(0);
        String retf = formData.get("retf").get(0);

        Timestamp startDateTimestamp = null;
        Timestamp endDateTimestamp = null;

        if (startDt != null && !startDt.isEmpty() && endDt != null && !endDt.isEmpty()) {
            DateFormat dateFormat = new SimpleDateFormat(pattern);

            Date startDate = dateFormat.parse(startDt);
            Date endDate = dateFormat.parse(endDt);

            startDateTimestamp = new Timestamp(startDate.getTime());
            endDateTimestamp = new Timestamp(endDate.getTime());
        }

        PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto = PmLendRtnHstryRequestDto.builder()
                .retf(retf)
                .startSearchDt(startDateTimestamp)
                .endSearchDt(endDateTimestamp)
                .build();

        PmLendRtnHstryGraphResponseDto result = pmLendRtnHstryService.getOverallPmLendRtnHstryStat(pmLendRtnHstryRequestDto);

        return result;
    }

    @ResponseBody
    @RequestMapping(value="/getIllegalParkingList.json", method = RequestMethod.GET)
    public List<PmLendRtnHstry> getIllegalParkingList() {
        log.debug("getIllegalParkingList starts!");

        PmLendRtnHstry pmLendRtnHstry = PmLendRtnHstry.builder()
                            .ille_park(0)
                            .build();

        List<PmLendRtnHstry> result = pmLendRtnHstryService.selectPmLendRtnHstryList(pmLendRtnHstry);

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/getPolygonInfo.json", method = RequestMethod.POST)
    public PmLendRtnHstryTimeBasedUsageResponseDto getPolygonInfo(@RequestBody MultiValueMap<String, String> formData) throws ParseException {
        log.debug("getPolygonInfo starts!");

        String pattern = "yyyy-MM-dd HH:mm:ss";

        String startDt = formData.get("startSearchDt").get(0);
        String endDt = formData.get("endSearchDt").get(0);
        String retf = formData.get("retf").get(0);

        Timestamp startDateTimestamp = null;
        Timestamp endDateTimestamp = null;

        if (startDt != null && !startDt.isEmpty() && endDt != null && !endDt.isEmpty()) {
            DateFormat dateFormat = new SimpleDateFormat(pattern);

            Date startDate = dateFormat.parse(startDt);
            Date endDate = dateFormat.parse(endDt);

            startDateTimestamp = new Timestamp(startDate.getTime());
            endDateTimestamp = new Timestamp(endDate.getTime());
        }

        PmLendRtnHstryRequestDto pmLendRtnHstryRequestDto = PmLendRtnHstryRequestDto.builder()
                                                                            .startSearchDt(startDateTimestamp)
                                                                            .endSearchDt(endDateTimestamp)
                                                                            .retf(retf)
                                                                            .build();

        PmLendRtnHstryTimeBasedUsageResponseDto result = pmLendRtnHstryService.getPolygonInfo(pmLendRtnHstryRequestDto);

        return result;
    }

    @RequestMapping (value= "/downloadExcel.json", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> downloadExcel(HttpServletRequest request, HttpServletResponse respons, PmDrivingSearch pmDrivingSearch) throws IllegalArgumentException {

        List<Map<String, Object>> dataList = pmDrivingService.selectList4Map(pmDrivingSearch);
        dataList = dataList.stream().map(data->{
            if (!data.containsKey("oper") || data.get("oper").equals("") || data.get("oper")==null) {
                data.put("oper", "-");
            }
            if (!data.containsKey("pmType") || data.get("pmType").equals("") || data.get("pmType")==null) {
                data.put("pmType", "-");
            }
            if (!data.containsKey("mbrNo") || data.get("mbrNo").equals("") || data.get("mbrNo")==null) {
                data.put("mbrNo", "-");
            }
            if (!data.containsKey("kckbrdId") || data.get("kckbrdId").equals("") || data.get("kckbrdId")==null) {
                data.put("kckbrdId", "-");
            }
            if (!data.containsKey("rentSpot") || data.get("rentSpot").equals("") || data.get("rentSpot")==null) {
                data.put("rentSpot", "-");
            }
            if (!data.containsKey("lendDt") || data.get("lendDt").equals("") || data.get("lendDt")==null) {
                data.put("lendDt", "-");
            }
            if (!data.containsKey("returnSpot") || data.get("returnSpot").equals("") || data.get("returnSpot")==null) {
                data.put("returnSpot", "-");
            }
            if (!data.containsKey("rtnDt") || data.get("rtnDt").equals("") || data.get("rtnDt")==null) {
                data.put("rtnDt", "-");
            }
            if (data.containsKey("illePark")) {
                if (data.get("illePark") == Integer.valueOf(1)) {
                    data.put("illePark", "○");
                } else if (data.get("illePark") == Integer.valueOf(0)) {
                    data.put("illePark", "X");
                }
            }
            return data;
        }).collect(Collectors.toList());
        String[] title = {"순번","운영사","PM 종류","회원번호","PM ID","대여 지역","대여일","반납 지역","반납일","불법주차"};
        int[] width = {5000,5000,5000,5000,5000,5000,5000,5000,5000,5000};
        String[] cont = {"id", "oper", "pmType", "mbrNo", "kckbrdId", "rentSpot", "lendDt", "returnSpot", "rtnDt", "illePark"};
        String fileName = commonService.createExcel(request, respons, dataList, title, cont, width);

        Map<String, Object> result = new HashedMap<>();
        result.put("fileName", fileName);
        return result;
    }

}
