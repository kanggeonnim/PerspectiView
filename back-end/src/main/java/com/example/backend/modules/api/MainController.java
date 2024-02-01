package com.example.backend.modules.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/")
public class MainController {

    @GetMapping
    public ApiResult<String> healthCheck(){
        return ApiResult.OK(LocalDateTime.now().toString());
    }
}
