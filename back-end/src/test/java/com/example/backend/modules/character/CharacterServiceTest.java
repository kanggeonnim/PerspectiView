package com.example.backend.modules.character;

import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.productrelation.ProductRelationRepository;
import com.example.backend.modules.productrelation.ProductRelationService;
import com.example.backend.modules.story.*;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@Slf4j
class CharacterServiceTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    ProductRelationRepository productRelationRepository;

    @Autowired
    ProductRelationService productRelationService;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    CharacterRepository characterRepository;

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
                .content("SibalContents: StartContents")
                .build();
        contentRepository.save(content);

        story = Story.builder()
                .title("storyTitle")
                .positionX(1)
                .positionY(1.0)
                .plot(plot)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();

        characters = new ArrayList<>();
        foreShadowings = new ArrayList<>();
        storyService.createStory(story, plot.getId(),"", characters,foreShadowings);

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
    @DisplayName("전체 등장인물 조회 서비스 테스트")
    void 전체인물조회() throws Exception {
        //given
        productRepository.save(product);
        Character character1 = Character.builder().characterName("뽀로로").product(product).build();
        Character character2 = Character.builder().characterName("포비").product(product).build();
        Character character3 = Character.builder().characterName("루피").product(product).build();

        characterRepository.save(character1);
        characterRepository.save(character2);
        characterRepository.save(character3);
        //when
        List<Character> result = characterService.getCharacters(product.getId());

        //then
        Assertions.assertThat(result.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("단일 등장인물 조회 서비스 테스트")
    void 단일인물조회() throws Exception {
        //given
        Character character1 = Character.builder().characterName("뽀로로").product(product).build();
        characterRepository.save(character1);
        //when
        Optional<Character> result = characterRepository.findById(character1.getId());

        //then
        Assertions.assertThat(result.get().getCharacterName()).isEqualTo(character1.getCharacterName());
    }

    @Test
    @DisplayName("등장인물 생성 서비스 테스트")
    void 등장인물생성() {
        // given
        Character character1 = Character.builder().characterName("뽀로로").product(product).build();
        // when
        Character result = characterService.createCharacter(character1, product.getId());

        // then
        Assertions.assertThat(result.getCharacterName()).isEqualTo(character1.getCharacterName());
    }

    @Test
    @DisplayName("등장인물 삭제 서비스 테스트")
    void 등장인물삭제() {
        // given
        Character character1 = Character.builder().characterName("뽀로로").product(product).build();
        characterService.createCharacter(character1,product.getId());


        // when

        characterService.deleteCharacter(character1.getId());
        // then
        assertThrows(RuntimeException.class, () -> {
            characterService.getCharacter(character1.getId());
        });
    }
}