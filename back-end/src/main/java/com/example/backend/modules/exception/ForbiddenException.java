package com.example.backend.modules.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ForbiddenException extends RuntimeException{
    private HttpStatus httpStatus = HttpStatus.FORBIDDEN;

    public ForbiddenException(String message) {
        super(message);
    }
}
