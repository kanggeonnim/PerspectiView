package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@Slf4j
@TestMethodOrder(MethodOrderer.class)
class StoryServiceTest {

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PlotRepository plotRepository;

    @Autowired
    ContentRepository contentRepository;

    @Autowired
    StoryService storyService;

    @Autowired
    StoryForeShadowingRepository storyForeShadowingRepository;

    @Autowired
    ForeShadowingRepository foreShadowingRepository;

    private Product product;

    private Plot plot;

    private ForeShadowing foreShadowing;

    private List<ForeShadowing> foreShadowings;

    List<Character> characters;

    private Story story;

    private Content content;

    @BeforeEach
    public void setup() {
        product = Product.builder()
                .title("productTitle")
                .image("image")
                .info("info")
                .build();
        productRepository.save(product);

        plot = Plot.builder()
                .name("name")
                .color("red")
                .product(product)
                .build();
        plotRepository.save(plot);

        content = Content.builder()
                .content("SibalContents: StartContents")
                .build();
        contentRepository.save(content);

        story = Story.builder()
                .title("storyTitle")
                .positionX(1)
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new HashSet<>())
                .storyRelations(new HashSet<>())
                .build();

        characters = new ArrayList<>();
        foreShadowings = new ArrayList<>();

        storyService.createStory(story, "", characters);

        foreShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowClose(false)
                .fShadowName("fShadowName")
                .fShadowContent("fShadowContent")
                .build();
        foreShadowingRepository.save(foreShadowing);

        StoryForeShadowing storyForeShadowing = StoryForeShadowing.builder()
                .story(story)
                .foreShadowing(foreShadowing)
                .build();
        storyForeShadowingRepository.save(storyForeShadowing);

        log.info(storyForeShadowing.getStory().getTitle());
        log.info(String.valueOf(storyForeShadowing.getStory().getPositionX()));

        story.addStoryForeShadowing(storyForeShadowing);
    }


    @Test
    @DisplayName("스토리 상세 조회 서비스 테스트")
    @Order(1)
    void 스토리상세조회() throws Exception {
        //given
        Long storyId = story.getId();

        //when
        StoryResponseDto findStory = storyService.findByStoryId(storyId);
        log.info(Arrays.toString(findStory.getForeShadowings().toArray(new ForeShadowing[0])));

        //then
        Assertions.assertEquals(findStory.getStoryTitle(), story.getTitle());
    }

    /**
     * todo 스토리 생성테스트 필요 (index변경 로직 완성 후)
     */
    @Test
    @Order(2)
    void 스토리생성테스트() throws Exception {
        //given

        //when

        //then

    }

    @Test
    @Order(3)
    void 스토리수정테스트() throws Exception {
        //given
        Story newStory = Story.builder()
                .id(story.getId())
                .title("changedStoryTitle")
                .positionX(1)
                .content(content)
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new HashSet<>())
                .storyRelations(new HashSet<>())
                .build();
        //when
        Story updatedStory = storyService.updateStory(newStory, characters, foreShadowings);

        //then
        Assertions.assertEquals(updatedStory.getTitle(), newStory.getTitle());
    }

    @Test
    @Order(4)
    void 스토리삭제테스트() throws Exception {
        //given

        //when
        storyService.deleteStory(story.getId());
        //then
        assertThrows(RuntimeException.class, () ->
                storyService.findByStoryId(story.getId()));
    }
}