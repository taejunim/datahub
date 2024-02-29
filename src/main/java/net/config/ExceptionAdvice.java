package net.config;

import lombok.extern.slf4j.Slf4j;
import net.exception.CustomException;
import net.exception.ErrorDto;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;


@Slf4j
@ControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(Exception.class)
    protected Object defaultException(HttpServletRequest request, Exception e) {
        StackTraceElement cth = e.getStackTrace()[0];
        String uuid = UUID.randomUUID().toString();
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        String errorLog = "오류발생 >> "
                + " 파일명: " + cth.getFileName()
                + ", 함수명: " + cth.getMethodName()
                + ", 줄수: " + cth.getLineNumber()
                + ", 요약: " + e.getMessage()
                + ", \nstack: " + ExceptionUtils.getStackTrace(e);
        log.error(errorLog);

        ErrorDto errorDto = new ErrorDto(httpStatus.value(), e.getClass().toString());
        ResponseEntity<ErrorDto> responseEntity = new ResponseEntity<>( errorDto, httpStatus );

        String ext = request.getRequestURI();
        if (ext.endsWith(".json")) {
            return responseEntity;
        }

        ModelAndView mav = new ModelAndView();
        mav.setViewName("error/error");
        mav.addObject("errorCode", httpStatus.value());
        mav.addObject("errorLog", responseEntity.getBody());
        return mav;
    }

    @ExceptionHandler(CustomException.class)
    protected Object customException(HttpServletRequest request, CustomException e) {
        StackTraceElement cth = e.getStackTrace()[0];

        String msg = e.getErrorCode().getMessage();

        String uuid = UUID.randomUUID().toString();

        ErrorDto errorDto = ErrorDto.of(e);
        ResponseEntity<ErrorDto> responseEntity = new ResponseEntity<>( errorDto, e.getErrorCode().getHttpStatus() );

        String errorLog = "오류발생 >> "
                + " 파일명: " + cth.getFileName()
                + ", 함수명: " + cth.getMethodName()
                + ", 줄수: " + cth.getLineNumber()
                + ", msg: " + msg
                + ", httpStatus: " + e.getErrorCode().getHttpStatus()
                + ", debugMessage: " + e.getDebugMessage()
                + ", \nstack: " + ExceptionUtils.getStackTrace(e);

        log.error(errorLog);

        String ext = request.getRequestURI();
        if (ext.endsWith(".json")) {
            return responseEntity;
        }

        ModelAndView mav = new ModelAndView();
        mav.setViewName("error/error");
        mav.addObject("errorCode", e.getErrorCode().getHttpStatus().value());
        mav.addObject("errorLog", responseEntity.getBody());
        return mav;
    }
}