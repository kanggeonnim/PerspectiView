package com.example.backend.modules.auth;


import com.example.backend.modules.auth.RefreshToken;
import com.example.backend.infra.security.JwtUtil;
import com.example.backend.modules.auth.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenService {

    private final RefreshTokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public void removeRefreshToken(String accessToken) {
        RefreshToken token = tokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);

        tokenRepository.delete(token);
    }

    @Transactional
    public String republishAccessToken(String accessToken) {
        // 액세스 토큰으로 Refresh 토큰 객체를 조회
        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);

        // RefreshToken이 유효하고 AccessToken이 만료된 상태라면 실행
        log.info("verifyAccessToken: " + jwtUtil.verifyToken(accessToken));
        if (refreshToken.isPresent() && !jwtUtil.verifyToken(accessToken)&& jwtUtil.verifyToken(refreshToken.get().getRefreshToken())) {
            log.info("정상적으로 accessToken발급 완료");
            // RefreshToken 객체를 꺼내온다.
            RefreshToken resultToken = refreshToken.get();
            // 권한과 아이디를 추출해 새로운 액세스토큰을 만든다.
            String newAccessToken = jwtUtil.generateAccessToken(resultToken.getId(), jwtUtil.getRole(resultToken.getRefreshToken()));
            // 액세스 토큰의 값을 수정해준다.
            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);
            // 새로운 액세스 토큰을 반환해준다.
            return newAccessToken;
        }
        // 만약 AccessToken이 유효하지만 refreshToken을 통해 요청하면다면 refreshToken이 탈취되었음을 의미.
        // refresh, access Token 만료 후 재로그인 요청
        else{
            removeRefreshToken(accessToken);
            return null;
        }

    }
}