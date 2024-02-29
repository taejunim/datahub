package net.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ErrorDto {
    private int status;
    private String message;
    private String debugMessage;

    public ErrorDto(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ErrorDto of(CustomException customException) {
        return new ErrorDto(customException.getErrorCode().getHttpStatus().value(), customException.getErrorCode().getMessage(), customException.getDebugMessage());
    }
}