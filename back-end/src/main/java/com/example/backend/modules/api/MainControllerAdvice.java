package com.example.backend.modules.api;

import com.example.backend.modules.exception.BadRequestException;
import com.example.backend.modules.exception.ForbiddenException;
import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MainControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ApiResult<?> handleException(Exception e){
        return ApiResult.ERROR(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ApiResult<?> handleNotFoundException(NotFoundException e){
        return ApiResult.ERROR(e.getMessage(), e.getHttpStatus());
    }

    @ExceptionHandler(BadRequestException.class)
    public ApiResult<?> handleBadException(BadRequestException e){
        return ApiResult.ERROR(e.getMessage(), e.getHttpStatus());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ApiResult<?> handleUnauthorizedException(UnauthorizedException e){
        return ApiResult.ERROR(e.getMessage(), e.getHttpStatus());
    }

    @ExceptionHandler(ForbiddenException.class)
    public ApiResult<?> handleForbiddenException(ForbiddenException e){
        return ApiResult.ERROR(e.getMessage(), e.getHttpStatus());
    }
}
