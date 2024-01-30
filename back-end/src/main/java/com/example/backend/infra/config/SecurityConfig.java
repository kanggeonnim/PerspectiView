package com.example.backend.infra.config;

import com.example.backend.modules.auth.oauth.PrincipalOauth2UserService;
import com.example.backend.infra.security.JwtAuthorizationFilter;
import com.example.backend.infra.security.JwtExceptionFilter;
import com.example.backend.infra.security.JwtSuccessHandler;
import com.example.backend.infra.security.MyAuthenticationFailureHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // IoC 빈(bean)을 등록
@RequiredArgsConstructor
public class SecurityConfig {

	private final PrincipalOauth2UserService principalOauth2UserService;
	private final JwtSuccessHandler jwtSuccessHandler;
	private final MyAuthenticationFailureHandler myAuthenticationFailureHandler;
	private final JwtAuthorizationFilter jwtAuthorizationFilter;
	private final JwtExceptionFilter jwtExceptionFilter;

	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.headers((headers)->
						headers.contentTypeOptions(contentTypeOptionsConfig ->
								headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)))
				.formLogin(AbstractHttpConfigurer::disable) // form 로그인 비활성화
				.sessionManagement(sessionManagement->sessionManagement
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorize ->
								authorize
						.requestMatchers("/user/**").authenticated()
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') or
						// hasRole('ROLE_USER')")
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') and
						// hasRole('ROLE_USER')")
						.requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
						.anyRequest().permitAll())
				.oauth2Login(oauth->
						oauth
								.loginPage("/login")
								.userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(principalOauth2UserService))
								.successHandler(jwtSuccessHandler)
								.failureHandler(myAuthenticationFailureHandler))
				.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtExceptionFilter, JwtAuthorizationFilter.class);
		return http.build();
	}
}
