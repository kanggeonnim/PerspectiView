package com.example.backend.modules.user;

import com.example.backend.infra.security.JwtSuccessHandler;
import com.example.backend.infra.security.MyAuthenticationFailureHandler;
import com.example.backend.modules.auth.oauth.PrincipalOauth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
@ActiveProfiles("app")
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PrincipalOauth2UserService principalOauth2UserService;

    @MockBean
    private JwtSuccessHandler jwtSuccessHandler;

    @MockBean
    private MyAuthenticationFailureHandler myAuthenticationFailureHandler;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

//    @Test
//    @WithMockUser(roles="USER")
//    void 권한_테스트() throws Exception {
//        //given
//        mvc.perform(get("user/"))
//                .andExpect(status().isOk());
//
//        //when
//
//
//        //then
//    }
}