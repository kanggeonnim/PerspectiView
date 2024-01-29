package com.example.backend.security.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


//public interface JwtProperties {
//	 String SECRET = "Geon_Secret_Code"; // 우리 서버만 알고 있는 비밀값
//	int EXPIRATION_TIME = 864000000; // 10일 (1/1000초)
//	String TOKEN_PREFIX = "Bearer ";
//	String HEADER_STRING = "Authorization";
//}

@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {
	private String secret;
	private String haederRefresh;
	private String haederAccess;
	private String tokenPrefix;
}