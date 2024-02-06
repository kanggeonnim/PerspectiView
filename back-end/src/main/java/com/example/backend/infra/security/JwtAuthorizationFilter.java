package com.example.backend.infra.security;

import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException, IllegalStateException {
        String token = request.getHeader("Authorization");
        if (token == null) {
            chain.doFilter(request, response);
            return;
        }

        token = jwtUtil.BearerRemove(token);

        // AccessToken을 검증하고, 만료되었을경우 예외를 발생시킨다.
        if (!jwtUtil.verifyToken(token)) {
            throw new JwtException("Access Token 만료!");
        }

        // AccessToken의 값이 있고, 유효한 경우에 진행한다.
        if (jwtUtil.verifyToken(token)) {
            // AccessToken 내부의 payload에 있는 email로 user를 조회한다. 없다면 예외를 발생시킨다 -> 정상 케이스가 아님
            User user = userRepository.findWithAuthoritiesByUsername(jwtUtil.getUid(token))
                    .orElseThrow(IllegalStateException::new);

            PrincipalDetails principalDetails = new PrincipalDetails(user);
            log.info("authorize 권한 체크 : {}", principalDetails.getUser().getAuthorities());
            log.info("authorize 권한 체크 : {}", principalDetails.getAuthorities());
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    principalDetails,    // 나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                    null,                // 패스워드 null 처리
                    principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 접근하여 값 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}