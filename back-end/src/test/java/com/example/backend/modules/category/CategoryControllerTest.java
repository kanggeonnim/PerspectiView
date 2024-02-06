package com.example.backend.modules.category;

import jakarta.persistence.EntityManager;
//import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.client.match.MockRestRequestMatchers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
public class CategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EntityManager em;

    @BeforeEach
    public void setup(){
        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();

        em.persist(category1);
        em.persist(category2);
    }
    
    @Test
    public void 카테고리전체조회() throws Exception{
        //given
        String expectByName = "$['response'].[?(@.name == '%s')]";
        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/category"))
        //then
                .andExpect(MockMvcResultMatchers.jsonPath(expectByName,"webtoon").exists())
                .andExpect(MockMvcResultMatchers.jsonPath(expectByName,"novel").exists())
                .andDo(MockMvcResultHandlers.print());
    }

}