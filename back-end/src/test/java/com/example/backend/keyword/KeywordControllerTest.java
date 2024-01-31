package com.example.backend.keyword;

import com.example.backend.modules.keyword.Keyword;
import com.example.backend.modules.keyword.KeywordService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;
import java.util.Map;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class KeywordControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private KeywordService keywordService;

    @Test
    public void 키워드생성() throws Exception{
        //given
        Map<String, String> input = new HashMap<>();
        input.put("name","cold");

        ObjectMapper objectMapper = new ObjectMapper();

        System.out.println(objectMapper.writeValueAsString(input));

        //when
        mockMvc.perform(MockMvcRequestBuilders.post("/keyword/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input))
                )

        //then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void 키워드전체조회() throws Exception{
        //given
        Keyword keyword1 =Keyword.builder().name("cold").build();
        Keyword keyword2 = Keyword.builder().name("Scientist").build();

        keywordService.createKeyword(keyword1);
        keywordService.createKeyword(keyword2);

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/keyword/"))
        //then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void 키워드아이디조회() throws Exception{
        //given
        Keyword keyword1 =Keyword.builder().name("cold").build();
        keywordService.createKeyword(keyword1);
        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/keyword/1"))
        //then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void 키워드이름조회() throws Exception{
        //given
        Keyword keyword1 =Keyword.builder().name("cold").build();
        Keyword keyword2 =Keyword.builder().name("old").build();

        keywordService.createKeyword(keyword1);
        keywordService.createKeyword(keyword2);
        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/keyword/name/ol"))
        //then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}