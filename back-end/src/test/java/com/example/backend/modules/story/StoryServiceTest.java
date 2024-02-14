package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterService;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingPreviewDto;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.productrelation.ProductRelationRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import com.example.backend.modules.user.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@Slf4j
class StoryServiceTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    ProductRelationRepository productRelationRepository;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CharacterService characterService;

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

    private Team team;

    private User user;

    private Product product;

    private Plot plot;

    private ForeShadowing foreShadowing;

    private ForeShadowing foreShadowing2;

    private List<ForeShadowing> foreShadowings;

    List<Character> characters;

    private Character fromCharacter;

    private Character toCharacter;

    private Story story;

    private Content content;

    @PersistenceContext
    EntityManager em;

    @BeforeEach
    public void setup() {
        user = User.builder().userNickname("nickname")
                .userImageUrl("https://s3")
                .username("username")
                .email("kangkun@naver.com")
                .provider("kakao")
                .providerId("kakao_1234")
                .userInfo("bio")
                .build();

        userRepository.save(user);

        team = Team.builder().title("team1")
                .info("team info")
                .personal(false)
                .build();
        teamService.createTeam(team, user);

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
                .content("Contents: StartContents")
                .build();
        contentRepository.save(content);

        story = Story.builder()
                .title("storyTitle")
                .content(content)
                .positionX(1)
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();

        characters = new ArrayList<>();
        foreShadowings = new ArrayList<>();
        storyService.createStory(story, plot.getId(), characters, foreShadowings);

        fromCharacter = Character.builder()
                .product(product)
                .characterName("fromCharacter")
                .build();

        toCharacter = Character.builder()
                .product(product)
                .characterName("toCharacter")
                .build();
        characterService.createCharacter(fromCharacter, product.getId());
        characterService.createCharacter(toCharacter, product.getId());

        foreShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowClose(null)
                .fShadowName("fShadowName")
                .fShadowContent("fShadowContent")
                .build();

        foreShadowing2 = ForeShadowing.builder()
                .product(product)
                .fShadowClose(null)
                .fShadowName("fShadowName22")
                .fShadowContent("fShadowContent")
                .build();

        foreShadowingRepository.save(foreShadowing);
        foreShadowingRepository.save(foreShadowing2);

        storyService.createStoryFshadow(foreShadowing.getId(), story.getId());
//        StoryForeShadowing storyForeShadowing = StoryForeShadowing.builder()
//                .story(story)
//                .foreShadowing(foreShadowing)
//                .build();
//
//        storyForeShadowingRepository.save(storyForeShadowing);
//
//        log.info(storyForeShadowing.getStory().getTitle());
//        log.info(String.valueOf(storyForeShadowing.getStory().getPositionX()));
//
//        story.addStoryForeShadowing(storyForeShadowing);
//
//        log.info(storyForeShadowing.getStory().getTitle());
//        log.info(String.valueOf(storyForeShadowing.getStory().getPositionX()));storyForeShadowing
    }


    @Test
    @DisplayName("스토리 상세 조회 서비스 테스트")
    void 스토리상세조회() throws Exception {
        //given
        Long storyId = story.getId();

        //when
        StoryResponseDto findStory = storyService.findByStoryId(storyId);

        //then
        Assertions.assertEquals(findStory.getStoryTitle(), story.getTitle());
    }

    /**
     * todo 스토리 생성테스트 필요 (index변경 로직 완성 후)
     */
    @Test
    void 스토리생성테스트() throws Exception {
        //given
        Story s = Story.builder()
                .title("생성테스트 story")
                .positionX(1)
                .positionY(1.1)
                .content(new Content("Content"))
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();
        String content = "내용이 들어감";

        System.out.println("생성 테스트 전 스토리 전체 개수: " + storyRepository.findAll().size());


        //when
        Story result = storyService.createStory(s, plot.getId(), characters, foreShadowings);
        em.flush();
        em.clear();

        StoryResponseDto story1 = storyService.findByStoryId(story.getId());


        for (int i = 0; i < 100; i++) {
            System.out.println("HH@@@@@@@@@@@@: " + i);
            storyService.findByStoryId(story.getId());
            em.flush();
            em.clear();
        }

        StoryResponseDto story2 = storyService.findByStoryId(s.getId());

        System.out.println("생성 테스트 하고 난 후 스토리 전체 개수: " + storyRepository.findAll().size());

        List<Story> stories = storyRepository.findWithPlotByPlot(plot);
        for (Story printstory : stories) {
            System.out.println("플롯이 같은 스토리 정보 :" + printstory.getId() + " 좌표 : " + printstory.getPositionX());
        }

        //then
        assertEquals("생성테스트 story", result.getTitle(), "title이 다릅니다.");
        assertEquals(1, story2.getPositionX(), "순서가 다릅니다.");
//        assertEquals(2, story1.getPositionX(), "순서가 업데이트가 안되네요;;");
    }

    @Test
    void 스토리수정테스트() throws Exception {
        //given
        Story newStory = Story.builder()
                .title("changedStoryTitle")
                .positionX(1)
                .content(new Content("content"))
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();
        //when
        Story updatedStory = storyService.updateStory(story.getId(), newStory, characters, foreShadowings);
        em.flush();
        em.clear();
        List<Story> checkQuery = storyRepository.findWithPlotByPlot(plot);
        checkQuery.get(0).getPlot().getClass();
        checkQuery.get(0).getPlot().getName();
        log.info(checkQuery.get(0).getTitle());

        //then
        Assertions.assertEquals(updatedStory.getTitle(), newStory.getTitle());
    }

    @Test
    void 스토리삭제테스트() throws Exception {
        //given
        Story delStory = Story.builder()
                .title("삭제테스트 story")
                .positionX(1)
                .positionY(1.0)
                .content(new Content("Content"))
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();
        storyService.createStory(delStory, plot.getId(), characters, foreShadowings);
        //when
        storyService.deleteStory(delStory.getId());
        //then
        assertThrows(RuntimeException.class, () ->
                storyService.findByStoryId(delStory.getId()));
    }

    @Test
    public void 스토리등장인물추가() throws Exception {
        //given
        List<Character> characters1 = new ArrayList<>();
        characters1.add(toCharacter);
        characters1.add(fromCharacter);
        storyService.updateStory(story.getId(), story, characters1, foreShadowings);

        //when
        int result = storyService.findByStoryId(story.getId()).getCharacters().size();

        //then
        assertEquals(result, 2);
    }

    @Test
    public void 스토리등장인물삭제() throws Exception {
        //given
        List<Character> characters1 = new ArrayList<>();
        characters1.add(toCharacter);
        characters1.add(fromCharacter);
        storyService.updateStory(story.getId(), story, characters1, foreShadowings);

        List<Character> characters2 = new ArrayList<>();
        characters2.add(toCharacter);
        storyService.updateStory(story.getId(), story, characters2, foreShadowings);

        //when
        int result = storyService.findByStoryId(story.getId()).getCharacters().size();


        //then
        assertEquals(result, 1);
    }

    @Test
    @Order(5)
    public void 스토리Y축변경() throws Exception {
        //given
        Story newStory = Story.builder()
                .title("storyTitle")
                .content(new Content("content"))
                .positionX(1)
                .positionY(3.0)
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();

        storyRepository.save(newStory);
        //when
        storyService.updatePositionY(newStory.getId(), newStory.getPositionY());
        StoryResponseDto findStory = storyService.findByStoryId(newStory.getId());
        //then
        assertEquals(newStory.getPositionY(), findStory.getPositionY(), "위치가 변해야합니다.");
    }

    @Test
    @Order(6)
    public void 복선스토리생성테스트() throws Exception {
        //given
        //when
        storyService.createStoryFshadow(foreShadowing2.getId(), story.getId());
        em.flush();
        em.clear();
        //then
        log.info("then");
        StoryResponseDto storyResponseDto = storyService.findByStoryId(story.getId());
        List<ForeShadowingPreviewDto> foreShadowingList = storyResponseDto.getForeShadowings();
        for (ForeShadowingPreviewDto f : foreShadowingList) {
            log.info(f.getFshadowName());
        }

        assertEquals(foreShadowingList.size(), 2);
    }

    @Test
    @Order(7)
    public void 복선스토리삭제테스트() throws Exception {
        //given
        Set<StoryForeShadowing> storyForeShadowings = story.getStoryForeShadowings();

        for (StoryForeShadowing s : storyForeShadowings) {
            log.info(s.getForeShadowing().getFShadowName());
        }
        //when

        storyService.deleteStoryFshadow(foreShadowing2.getId(), story.getId());
        em.flush();
        em.clear();
        //then
        log.info("then");
        storyForeShadowings = story.getStoryForeShadowings();
        storyForeShadowings.forEach(storyForeShadowing -> System.out.println(storyForeShadowing.getForeShadowing()));
        for (StoryForeShadowing s : storyForeShadowings) {
            log.info(s.getForeShadowing().getFShadowName());
        }

        assertEquals(storyForeShadowings.size(), 1);
    }


}