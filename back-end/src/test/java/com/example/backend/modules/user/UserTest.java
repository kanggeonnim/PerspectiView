package com.example.backend.modules.user;

import com.example.backend.infra.config.WithMockOAuth2Account;
import com.example.backend.infra.security.JwtAuthorizationFilter;
import com.example.backend.infra.security.JwtUtil;
import com.example.backend.modules.auth.oauth.PrincipalOauth2UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@MockBeans({
        @MockBean(UserService.class),
        @MockBean(PrincipalOauth2UserService.class),
        @MockBean(UserRepository.class),
        @MockBean(JwtUtil.class),
        @MockBean(JwtAuthorizationFilter.class)
})
@ActiveProfiles("test")
class UserTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("로그인 없이 접근")
    void postUser() throws Exception {
        mockMvc.perform(get("/user/"))
                .andExpect(status().is3xxRedirection())
                .andDo(print());
    }

    @Test
    @WithMockOAuth2Account
    @DisplayName("로그인 후 접근")
    void postUserTest() throws Exception {
        mockMvc.perform(get("/user/"))
                .andExpect(status().isOk());
    }

}