package net.pm.web;

import lombok.extern.slf4j.Slf4j;
import net.exception.CustomException;
import net.exception.ErrorCode;
import net.jcms.framework.base.web.BaseController;
import net.jcms.framework.common.service.CommonService;
import net.pm.dto.DataTableDto;
import net.pm.dto.PmAcdntRcptInfoGraphResponseDto;
import net.pm.dto.PmAcdntRcptInfoRequestDto;
import net.pm.model.PmAccSearch;
import net.pm.model.PmAcdntRcptInfo;
import net.pm.service.PmAccService;
import net.pm.service.PmAcdntRcptInfoService;

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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequestMapping(value="/pm/accident")
public class PmAccidentController extends BaseController {

    @Autowired
    private PmAcdntRcptInfoService pmAcdntRcptInfoService;

    @Autowired
    private PmAccService pmAccService;

    @Autowired
    private CommonService commonService;

    @RequestMapping(value = "/list.mng", method = RequestMethod.GET)
    public String accidentList(Model model) {
        log.debug("accidentList Controller starts!");

        List<String> operators = pmAccService.selectOpers();
        List<String> accTypes = pmAccService.selectAccTypes();
        List<String> pmKinds = pmAccService.selectPmKinds();
        List<String> sex = pmAccService.selectSex();
        List<String> spot = pmAccService.selectSpot();

        model.addAttribute("operators", operators);
        model.addAttribute("accTypes", accTypes);
        model.addAttribute("pmKinds", pmKinds);
        model.addAttribute("sex", sex);
        model.addAttribute("spot", spot);

        return "pm/accident/list";
    }

    @ResponseBody
    @RequestMapping(value = "/getOverallAccidentList.json", method = RequestMethod.POST)
    public DataTableDto getOverallAccidentList(HttpServletRequest request, @RequestBody MultiValueMap<String, String> formData) throws ParseException {
        log.debug("getOverallAccidentList Controller starts!");

        String pattern = "yyyy-MM-dd HH:mm:ss";

        String startDt;
        try {
            startDt = formData.get("startSearchDt").get(0);
        } catch (NullPointerException e){
            throw new CustomException(ErrorCode.WRONG_PARAMETER, "startSearchDt 가 없습니다.");
        } catch (Exception e){
            throw new CustomException(ErrorCode.WRONG_PARAMETER, "startSearchDt 가 없습니다.");
        }

        String endDt = formData.get("endSearchDt").get(0);
        String accType = formData.get("accType").get(0);
        String location = formData.get("location").get(0);
        String pmKind = formData.get("pmKind").get(0);
        String gender = formData.get("gender").get(0);
        Integer age = formData.get("age").get(0) != null && !formData.get("age").get(0).equals("") ? Integer.parseInt(formData.get("age").get(0)) : null;
        String company = formData.get("company").get(0);
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

        PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto = PmAcdntRcptInfoRequestDto.builder()
                .sort(sort)
                .sortOrd(sortOder)
                .pagingYn(true)
                .start(start)
                .length(length)
                .accType(accType)
                .location(location)
                .pmKind(pmKind)
                .gender(gender)
                .age(age)
                .company(company)
                .startSearchDt(startDateTimestamp)
                .endSearchDt(endDateTimestamp)
                .build();

        List<PmAcdntRcptInfo> pmAcdntRcptInfoList = pmAcdntRcptInfoService.selectPmAcdntRcptInfoListByFilter(pmAcdntRcptInfoRequestDto);
        int total = pmAcdntRcptInfoService.countPmAcdntRcptInfoListByFilter(pmAcdntRcptInfoRequestDto);

        return DataTableDto.builder()
                .list(pmAcdntRcptInfoList)
                .total(total)
                .build();
    }

    @ResponseBody
    @RequestMapping(value = "/getOverallAccidentStat.json", method = RequestMethod.POST)
    public PmAcdntRcptInfoGraphResponseDto getOverallAccidentStat(@RequestBody MultiValueMap<String, String> formData) throws ParseException {
        log.debug("getOverallAccidentStat Controller starts!");

        String pattern = "yyyy-MM-dd HH:mm:ss";

        String startDt = formData.get("startSearchDt").get(0);
        String endDt = formData.get("endSearchDt").get(0);

        Timestamp startDateTimestamp = null;
        Timestamp endDateTimestamp = null;

        if (startDt != null && !startDt.isEmpty() && endDt != null && !endDt.isEmpty()) {
            DateFormat dateFormat = new SimpleDateFormat(pattern);

            Date startDate = dateFormat.parse(startDt);
            Date endDate = dateFormat.parse(endDt);

            startDateTimestamp = new Timestamp(startDate.getTime());
            endDateTimestamp = new Timestamp(endDate.getTime());
        }

        PmAcdntRcptInfoRequestDto pmAcdntRcptInfoRequestDto = PmAcdntRcptInfoRequestDto.builder()
                .startSearchDt(startDateTimestamp)
                .endSearchDt(endDateTimestamp)
                .build();

        PmAcdntRcptInfoGraphResponseDto result = pmAcdntRcptInfoService.getOverallPmAcdntRcptInfoStat(pmAcdntRcptInfoRequestDto);

        return result;
    }
    @RequestMapping (value= "/downloadExcel.json", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> downloadExcel(HttpServletRequest request, HttpServletResponse respons, PmAccSearch pmAccSearch) throws IllegalArgumentException {

        List<Map<String, Object>> dataList = pmAccService.selectList4Map(pmAccSearch);
        dataList = dataList.stream().map(data->{

            if (!data.containsKey("acdntType") || data.get("acdntType").equals("") || data.get("acdntType")==null) {
                data.put("acdntType", "-");
            }

            if (!data.containsKey("operCo") || data.get("operCo").equals("") || data.get("operCo")==null) {
                data.put("operCo", "-");
            }

            if (!data.containsKey("pmType") || data.get("pmType").equals("") || data.get("pmType")==null) {
                data.put("pmType", "-");
            }

            if (!data.containsKey("sexd") || data.get("sexd").equals("") || data.get("sexd")==null) {
                data.put("sexd", "-");
            }

            if (!data.containsKey("acdntOcrnDt") || data.get("acdntOcrnDt").equals("") || data.get("acdntOcrnDt")==null) {
                data.put("acdntOcrnDt", "-");
            }

            if (!data.containsKey("acdntSpot") || data.get("acdntSpot").equals("") || data.get("acdntSpot")==null) {
                data.put("acdntSpot", "-");
            }

            if (!data.containsKey("acdntOcrnPlc") || data.get("acdntOcrnPlc").equals("") || data.get("acdntOcrnPlc")==null) {
                data.put("acdntOcrnPlc", "-");
            }

            if (!data.containsKey("acdntCn") || data.get("acdntCn").equals("") || data.get("acdntCn")==null) {
                data.put("acdntCn", "-");
            }

            if (!data.containsKey("age") || data.get("age").equals("-") || data.get("age") == null || data.get("age").equals("")) {
                data.put("age", "-");
            }

            if (data.containsKey("acdntOcrnDt") && !data.get("acdntOcrnDt").equals("-")) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");

                LocalDateTime date = LocalDateTime.parse(String.valueOf(data.get("acdntOcrnDt")), formatter);

                LocalDate localDate = date.toLocalDate();

                data.put("acdntOcrnDt", localDate.toString());
            }

            return data;
        }).collect(Collectors.toList());

        String[] title = {"순번","사고 구분","운영사","PM 종류","성별","나이","사고날짜","사고지역","사고장소","사고 내용"};
        int[] width = {5000,5000,5000,5000,5000,5000,5000,5000,5000,5000};
        String[] cont = {"id", "acdntType", "operCo", "pmType", "sexd", "age", "acdntOcrnDt", "acdntSpot", "acdntOcrnPlc", "acdntCn"};
        String fileName = commonService.createExcel(request, respons, dataList, title, cont, width);

        Map<String, Object> result = new HashedMap<>();
        result.put("fileName", fileName);
        return result;
    }


}
