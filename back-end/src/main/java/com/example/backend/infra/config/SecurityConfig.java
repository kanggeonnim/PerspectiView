package com.example.backend.infra.config;

import com.example.backend.security.config.oauth.PrincipalOauth2UserService;
import com.example.backend.security.jwt.JwtSuccessHandler;
import com.example.backend.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // IoC 빈(bean)을 등록
@RequiredArgsConstructor
public class SecurityConfig {

	private final PrincipalOauth2UserService principalOauth2UserService;
	private final UserRepository userRepository;
	private final JwtSuccessHandler jwtSuccessHandler;

	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.headers((headers)->
					headers.contentTypeOptions(contentTypeOptionsConfig ->
							headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)))
				.authorizeRequests(authorize ->
								authorize
						.requestMatchers("/user/**").authenticated()
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') or
						// hasRole('ROLE_USER')")
						// .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') and
						// hasRole('ROLE_USER')")
						.requestMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
						.anyRequest().permitAll())
		//				.and()
		//				.formLogin()
		//				.loginPage("/login")
		//				.loginProcessingUrl("/loginProc")
		//				.defaultSuccessUrl("/")
		//				.and()
//				.addFilterAt(new JwtSuccessHandler(), UsernamePasswordAuthenticationFilter.class)
				.oauth2Login(oauth->
						oauth
								.loginPage("/login")
								.userInfoEndpoint(userInfoEndpointConfig ->
										userInfoEndpointConfig
												.userService(principalOauth2UserService))
								.successHandler(jwtSuccessHandler));
//								.failureHandler(new MyAuthenticationFailureHandler()));
//				.addFilterBefore(new JwtAuthorizationFilter(userRepository), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
