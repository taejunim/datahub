package net.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    SQL_ERROR(INTERNAL_SERVER_ERROR, "SQL ERROR"),
    WRONG_PARAMETER(INTERNAL_SERVER_ERROR, "파라미터가 잘못되었습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}