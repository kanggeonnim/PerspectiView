package com.example.backend.infra.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {
	private String secret;
	private String headerRefresh;
	private String headerAccess;
	private String tokenPrefix;
}