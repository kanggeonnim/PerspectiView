package com.example.backend.infra.config;

import com.example.backend.infra.security.*;
import com.example.backend.modules.auth.oauth.PrincipalOauth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionVoter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration // IoC 빈(bean)을 등록
@RequiredArgsConstructor
public class SecurityConfig {

	private final PrincipalOauth2UserService principalOauth2UserService;
	private final JwtSuccessHandler jwtSuccessHandler;
	private final MyAuthenticationFailureHandler myAuthenticationFailureHandler;
	private final JwtAuthorizationFilter jwtAuthorizationFilter;
	private final JwtExceptionFilter jwtExceptionFilter;
	private final TeamCheckVoter teamCheckVoter;

	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	public AccessDecisionManager accessDecisionManager() {
		List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>();
		decisionVoters.add(new WebExpressionVoter());
		// voter 목록에 teamCheckVoter 추가
		decisionVoters.add(teamCheckVoter);
		// 모든 voter 승인 시 허가
		return new UnanimousBased(decisionVoters);
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.httpBasic(AbstractHttpConfigurer::disable)
				.cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
				.headers((headers)->
						headers.contentTypeOptions(contentTypeOptionsConfig ->
								headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)))
				.formLogin(AbstractHttpConfigurer::disable) // form 로그인 비활성화
				.sessionManagement(sessionManagement->sessionManagement
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeRequests(authorize ->
						// accessDecisionManager
						authorize.accessDecisionManager(accessDecisionManager())
								.requestMatchers("/v3/**", "/swagger-ui/**").permitAll()
						.requestMatchers("/user/**").authenticated()
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') or
						// hasRole('ROLE_USER')")
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') and
						// hasRole('ROLE_USER')")
						.requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
										.requestMatchers("/genre/**").permitAll()
										.requestMatchers("/category/**").permitAll()
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

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://localhost:5173");
		configuration.addExposedHeader("Authorization");
		configuration.addAllowedMethod("*"); // 모든 HTTP 메소드 허용
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
