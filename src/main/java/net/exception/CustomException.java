package net.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ErrorCode errorCode;
    private final String debugMessage;

    public CustomException(ErrorCode errorCode, String debugMessage) {
        this.errorCode = errorCode;
        this.debugMessage = debugMessage;
    }
}