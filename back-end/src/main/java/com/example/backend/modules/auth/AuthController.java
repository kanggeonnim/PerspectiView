package com.example.backend.modules.auth;

import com.example.backend.infra.security.JwtUtil;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.StatusResponseDto;
import com.example.backend.modules.auth.TokenResponseStatus;
import com.example.backend.modules.auth.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final RefreshTokenService tokenService;
    private final JwtUtil jwtUtil;

    @PostMapping("/token/logout")
    public ApiResult<StatusResponseDto> logout(@RequestHeader(value = "Authorization") final String accessToken) {
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(jwtUtil.BearerRemove(accessToken));

        return ApiResult.OK(null);
    }

    @PostMapping("/token/refresh")
    public ApiResult<?> refresh(@RequestHeader("Authorization") final String refreshToken) {

        String newAccessToken = tokenService.republishAccessToken(jwtUtil.BearerRemove(refreshToken));
        if (StringUtils.hasText(newAccessToken)) {
            return ApiResult.OK(TokenResponseStatus.addStatus(200, newAccessToken));
        }

        return ApiResult.ERROR("유효한 토큰이 아닙니다.", HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }

}