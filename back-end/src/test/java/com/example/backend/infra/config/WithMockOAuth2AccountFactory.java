package com.example.backend.infra.config;

import com.example.backend.modules.user.User;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.HashMap;
import java.util.Map;

public class WithMockOAuth2AccountFactory implements
        WithSecurityContextFactory<WithMockOAuth2Account> {

    @Override
    public SecurityContext createSecurityContext(WithMockOAuth2Account account) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("username", account.username());
        attributes.put("name", account.email());

        User user = User.builder()
                .username(account.username())
                .userNickname(account.userNickname())
                .email(account.email())
                .provider(account.provider())
                .providerId(account.providerId())
                .build();

        PrincipalDetails principalDetails = new PrincipalDetails(user, attributes);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principalDetails,    // 나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                null,                // 패스워드 null 처리
                principalDetails.getAuthorities());
        context.setAuthentication(authentication);

        return context;
    }
}
