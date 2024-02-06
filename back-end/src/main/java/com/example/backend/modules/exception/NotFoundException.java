package com.example.backend.modules.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends RuntimeException{
    private HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public NotFoundException() {
        super("not found");
    }
}
