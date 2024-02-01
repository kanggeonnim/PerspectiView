package com.example.backend.modules.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MainControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ApiResult<?> handleException(Exception e){
        return ApiResult.ERROR(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
