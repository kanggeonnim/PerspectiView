package com.example.backend.keyword;

import jakarta.annotation.security.RunAs;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@SpringBootTest
@Transactional
@RunWith(SpringRunner.class)
public class KeywordControllerTest {
    @Autowired
    KeywordController keywordController;
    @Autowired
    KeywordService keywordService;
    @Autowired
    KeywordRepository keywordRepository;

    @Test
    public void 키워드생성() throws Exception {
        //given
        Keyword keyword = Keyword.builder().name("무뚝뚝").build();


        //when
        Keyword checkkeyword =  keywordService.createKeyword(keyword);
        //then
    }
}