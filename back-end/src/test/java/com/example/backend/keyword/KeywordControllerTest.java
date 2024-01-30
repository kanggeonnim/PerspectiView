package com.example.backend.keyword;


import com.google.gson.Gson;
import org.apache.coyote.http11.upgrade.UpgradeServletOutputStream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


import static org.mockito.Mockito.verify;

@WebMvcTest(controllers = KeywordController.class)
public class KeywordControllerTest {
    @Autowired
    MockMvc mvc;

    @MockBean
    KeywordService keywordService;

    @Test
    @DisplayName("키워드 생성 테스트")
    public void 키워드생성() throws Exception {
        //given
//        String content = objectMapper.writeValueAsString(
//                Keyword.builder()
//                        .name("활기찬")
//                        .build()
//        );
        Keyword keyword = Keyword.builder().name("testname").build();
        Gson gson = new Gson();
        String content = gson.toJson(keyword);

        //when
        mvc.perform(post("/keyword").contentType(MediaType.APPLICATION_JSON)
                .content(content))
                .andExpect(status().isCreated());
        //then
        verify(keywordService).createKeyword(keyword);
    }
}