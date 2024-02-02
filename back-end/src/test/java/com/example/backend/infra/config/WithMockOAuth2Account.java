package com.example.backend.infra.config;

import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockOAuth2AccountFactory.class)
public @interface WithMockOAuth2Account {
    String username() default "username";

    String userNickname() default "nickname";

    String email() default "kangkun@gmail.com";

    String provider() default "google";

    String providerId() default "1234";

    String role() default "ROLE_USER";
}
