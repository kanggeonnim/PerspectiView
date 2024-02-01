package com.example.backend.modules.genre;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("app")
class GenreControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private GenreServeice genreServeice;

    @Test
    public void 장르전체조회() throws Exception {
        //given
        
    }
}