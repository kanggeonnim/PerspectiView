package com.example.backend.modules.story;

import com.example.backend.infra.config.S3Config;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.product.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class StoryServiceTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private StoryService storyService;

    @Autowired
    ForeShadowingRepository foreShadowingRepository;

    @Mock
    Product product;

    private Plot plot;
    private Set<StoryForeShadowing> storyForeShadowings;

    @BeforeEach
    public void setup() {
        plot = Plot.builder()
                .name("name")
                .color("red")
                .product(product)
                .build();
//        storyForeShadowings.add(StoryForeShadowing.builder()
//                        .
//                .build());

    }

    @Test
    @DisplayName("스토리 상세 조회 서비스 테스트")
    void 스토리상세조회() throws Exception {
        //given
        Story story = Story.builder()
                .title("storyTitle")
                .plot(plot)
                .build();

        storyService.createStory(story, null, null);
        //when

        //then

    }
}