package com.example.backend.infra.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "시:작 API 명세서",
                description = "스토리 흐름 시각화 서비스 시:작 API 명세서",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi ProductApi() {
        String[] paths = {"/product/**"};

        return GroupedOpenApi.builder()
                .group("작품")
                .pathsToMatch(paths)
                .build();
    }
}
