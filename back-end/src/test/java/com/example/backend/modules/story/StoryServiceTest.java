package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.h2.util.ThreadDeadlockDetector;
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

    @PersistenceContext
    EntityManager em;

    @BeforeEach
    public void setup() {
        product = Product.builder()
                .title("productTitle")
                .productImageuRL("image")
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
        Story s = Story.builder()
                .title("생성테스트 story")
                .positionX(1)
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new HashSet<>())
                .storyRelations(new HashSet<>())
                .build();
        String content = "내용이 들어감";

        System.out.println("생성 테스트 전 스토리 전체 개수: "+ storyRepository.findAll().size());


        //when
        Story result = storyService.createStory(s, content,characters);
        em.flush();
        em.clear();

        StoryResponseDto story1=storyService.findByStoryId(story.getId());
        StoryResponseDto story2=storyService.findByStoryId(s.getId());

        System.out.println("생성 테스트 하고 난 후 스토리 전체 개수: "+ storyRepository.findAll().size());

        List<Story> stories = storyRepository.findWithPlotByPlot(plot);
        for(Story printstory :stories){
            System.out.println("플롯이 같은 스토리 정보 :"+printstory.getId() + " 좌표 : "+ printstory.getPositionX());
        }

        //then
        assertEquals("생성테스트 story",result.getTitle(),"title이 다릅니다.");
        assertEquals(1,story2.getPositionX(),"순서가 다릅니다.");
        assertEquals(2,story1.getPositionX(),"순서가 업데이트가 안되네요;;");
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
        em.flush();
        em.clear();
        List<Story> checkQuery = storyRepository.findWithPlotByPlot(plot);
        checkQuery.get(0).getPlot().getClass();
        checkQuery.get(0).getPlot().getName();

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

    @Test
    @Order(5)
    public void 스토리Y축변경() throws Exception{
        //given
        Story newStory = Story.builder()
                .id(story.getId())
                .positionY(3.0)
                .build();
        //when
        storyService.updatePositionY(newStory);
        StoryResponseDto findStory = storyService.findByStoryId(newStory.getId());
        //then
        assertEquals(newStory.getPositionY(),findStory.getPositionY(),"위치가 변해야합니다.");
    }
}