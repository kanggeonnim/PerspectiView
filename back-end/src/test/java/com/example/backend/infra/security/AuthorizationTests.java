package com.example.backend.infra.security;

import com.example.backend.infra.config.SecurityConfig;
import com.example.backend.modules.account.UserService;
import com.example.backend.modules.auth.oauth.PrincipalOauth2UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SecurityConfig.class)
@WebAppConfiguration
@Transactional
public class AuthorizationTests {

//    @MockBean
//    PrincipalOauth2UserService principalOauth2UserService;
//
//    @MockBean
//    JwtSuccessHandler jwtSuccessHandler;
//
//    @MockBean
//    MyAuthenticationFailureHandler myAuthenticationFailureHandler;
//
//    @MockBean
//    JwtAuthorizationFilter jwtAuthorizationFilter;
//
//    @MockBean
//    JwtExceptionFilter jwtExceptionFilter;

    @Autowired
    private WebApplicationContext context;

    UserService userService;

    @MockBean
    PrincipalOauth2UserService principalOauth2UserService;


    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity()) // (1)
                .build();
    }

    @Test
    public void 권한테스트() throws Exception {
        mvc
                .perform(get("/user").with(user("user1").password("pass").roles("USER")));
    }

    @Test(expected = AuthenticationCredentialsNotFoundException.class)
    public void getUserUnauthenticated() {
        userService.getUser("1");
    }
}