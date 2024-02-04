package com.example.backend.infra.security;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.GeneratedToken;
import com.example.backend.modules.auth.TokenResponseDto;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("successfullAuthentication 실행됨.");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        log.info("principal : {}", principalDetails);
        log.info("user : {}, list : {} ", principalDetails.getUser(), principalDetails.getUser().getAuthorities());
        GeneratedToken token =
                jwtUtil.generateToken(
                        principalDetails.getUser().getUsername(),
                        objectMapper.writeValueAsString(principalDetails.getUser().getAuthorities())
                );

        // body를 통해 access token과 refresh token 전달
        String result = objectMapper.writeValueAsString(ApiResult.OK(TokenResponseDto.from(token)));
        response.getWriter().write(result);

        // header를 통해 access token과 refresh token 전달
//        response.addHeader(jwtProperties.getHeaderAccess(),jwtProperties.getTokenPrefix()+token.getAccessToken());
//        response.addHeader(jwtProperties.getHeaderRefresh(),jwtProperties.getTokenPrefix()+token.getRefreshToken());
    }
}
