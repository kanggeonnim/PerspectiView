package com.example.backend.modules.auth;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class TokenResponseDto {
    String accessToken;
    String refreshToken;

    public static TokenResponseDto from(GeneratedToken token){
        return TokenResponseDto.builder()
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .build();
    }
}
