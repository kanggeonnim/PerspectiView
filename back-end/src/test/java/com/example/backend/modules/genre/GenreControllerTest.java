package com.example.backend.modules.genre;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class GenreControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private GenreServeice genreServeice;

    @BeforeEach
    public void setup() {
        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder().genreName("액션").build();
        Genre genre3 = Genre.builder().genreName("우주").build();

        genreServeice.createGenre(genre1);
        genreServeice.createGenre(genre2);
        genreServeice.createGenre(genre3);
    }

    @Test
    public void 장르전체조회() throws Exception {
        //given
        String expectByName = "$['response'].[?(@.genreName == '%s')]";

        //when
        mvc.perform(MockMvcRequestBuilders.get("/genre/"))
                //then
                .andExpect(MockMvcResultMatchers.jsonPath(expectByName, "SF").exists())
                .andExpect(MockMvcResultMatchers.jsonPath(expectByName, "액션").exists())
                .andExpect(MockMvcResultMatchers.jsonPath(expectByName, "우주").exists())
                .andDo(MockMvcResultHandlers.print());
    }
}