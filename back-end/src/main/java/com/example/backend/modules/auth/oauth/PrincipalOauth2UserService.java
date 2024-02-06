package com.example.backend.modules.auth.oauth;

import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserAuthority;
import com.example.backend.modules.user.UserAuthorityRepository;
import com.example.backend.modules.user.UserRepository;
import com.example.backend.modules.auth.oauth.provider.GoogleUserInfo;
import com.example.backend.modules.auth.oauth.provider.KakaoUserInfo;
import com.example.backend.modules.auth.oauth.provider.NaverUserInfo;
import com.example.backend.modules.auth.oauth.provider.OAuth2UserInfo;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final UserAuthorityRepository userAuthorityRepository;
    private final TeamService teamService;

    // userRequest 는 code를 받아서 accessToken을 응답 받은 객체
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest); // google의 회원 프로필 조회

        // code를 통해 구성한 정보
        log.info("userRequest clientRegistration : " + userRequest.getClientRegistration());
        // token을 통해 응답받은 회원정보
        log.info("oAuth2User : " + oAuth2User);

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        // Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
        OAuth2UserInfo oAuth2UserInfo = null;
        String provider = userRequest.getClientRegistration().getRegistrationId();

        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            log.info("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            log.info("카카오 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo((Map) oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            log.info("네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes());
        }

        Optional<User> optionalUser =
                userRepository.findByUsername(oAuth2UserInfo.getName());
        if (optionalUser.isEmpty()) {
            String providerId = oAuth2UserInfo.getProviderId();
            // 신규 회원가입
            User newUser = User.builder()
                    .username(provider + "_" + providerId)
                    .userNickname(provider + "_" + providerId)
                    .email(oAuth2UserInfo.getEmail())
                    .provider(provider)
                    .providerId(providerId)
                    .build();

            UserAuthority auth = UserAuthority.builder()
                    .user(newUser)
                    .role("ROLE_USER")
                    .build();

            userRepository.save(newUser);
            userAuthorityRepository.save(auth);

            // 개인 팀 생성
            Team personalTeam = Team.builder()
                    .personal(true)
                    .title("Personal Team")
                    .info("개인 작품이 저장되는 공간 입니다.")
                    .build();

            teamService.createTeam(personalTeam, newUser);
            // 신규 회원
            return new PrincipalDetails(newUser, oAuth2User.getAttributes());
        }
        // 기존에 가입된 회원
        return new PrincipalDetails(optionalUser.get(), oAuth2User.getAttributes());
    }
}
