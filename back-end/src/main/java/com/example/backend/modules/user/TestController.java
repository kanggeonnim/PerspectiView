package com.example.backend.modules.user;

import com.example.backend.infra.security.JwtUtil;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.GeneratedToken;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.exception.NotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Controller
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;
    @Value("${redirectUrl}")
    private String redirectUrl;

    @GetMapping
    public void getTest(@RequestParam String username,  HttpServletResponse response) throws IOException {

        User user = userRepository.findWithAuthoritiesByUsername(username).orElseThrow(()-> new NotFoundException());

        GeneratedToken token =
                jwtUtil.generateToken(
                        user.getUsername(),
                        objectMapper.writeValueAsString(user.getAuthorities())
                );

        // 쿠키 설정
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", URLEncoder.encode(token.getAccessToken(), "UTF-8"))
                .httpOnly(false)
                .secure(true)
                .path("/")      // path
                .maxAge(Duration.ofDays(1))
                .sameSite("None")  // sameSite
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

//        response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:5173/app/workspace")
        response.sendRedirect(UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }
}
