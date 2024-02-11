package com.example.backend.modules.productrelation;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterRequestDto;
import com.example.backend.modules.character.CharacterService;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.story.*;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@Slf4j
class ProductRelationServiceTest {
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

    private CharacterRequestDto fromCharacterRequestDto;

    private CharacterRequestDto toCharacterRequestDto;
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
        storyService.createStory(story, plot.getId(),"dd", characters,foreShadowings);

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

        fromCharacterRequestDto = CharacterRequestDto.builder()
                .id(fromCharacter.getId())
                .name(fromCharacter.getCharacterName())
                .detail(fromCharacter.getCharacterDetail())
                .positionY(fromCharacter.getPositionY())
                .positionX(fromCharacter.getPositionX())
                .build();

        toCharacterRequestDto = CharacterRequestDto.builder()
                .id(toCharacter.getId())
                .name(toCharacter.getCharacterName())
                .detail(toCharacter.getCharacterDetail())
                .positionY(toCharacter.getPositionY())
                .positionX(toCharacter.getPositionX())
                .build();
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
    void 인물관계생성() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();

        //when
        productRelationService.createProductRelation(product.getId(), productRelation);

        //then
        assertEquals(productRelationRepository.count(), 1);

    }

    @Test
    void 단일인물관계조회() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        productRelationService.createProductRelation(product.getId(), productRelation);

        //when
        ProductRelation findProductRelation = productRelationService.findProductRelation(productRelation.getId());

        //then
        assertEquals(findProductRelation.getProductRelationInfo(), productRelation.getProductRelationInfo());
    }

    @Test
    void 전체인물관계조회() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        ProductRelation productRelation2 = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        ProductRelation productRelation3 = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        productRelationService.createProductRelation(product.getId(), productRelation);
        productRelationService.createProductRelation(product.getId(), productRelation2);
        productRelationService.createProductRelation(product.getId(), productRelation3);

        //when
        List<ProductRelation> productRelations = productRelationService.findAllProductRelation(product.getId());

        //then
        assertEquals(productRelations.size(), 3);
    }

    @Test
    void 인물관계수정() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        productRelationService.createProductRelation(product.getId(), productRelation);

        ProductRelation beforeUpdate = ProductRelation.builder()
                .product(product)
                .productRelationInfo("updateinfo")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        //when
        ProductRelation afterUpdate = productRelationService.updateProductRelation(productRelation.getId(), beforeUpdate);

        //then
        assertEquals(afterUpdate.getProductRelationInfo(), beforeUpdate.getProductRelationInfo());
    }

    @Test
    public void 전체인물관계수정() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        ProductRelation productRelation2 = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        productRelationService.createProductRelation(product.getId(), productRelation);
        productRelationService.createProductRelation(product.getId(), productRelation2);

        em.flush();
        em.clear();

        ProductRelationRequestDto productRelation3 = ProductRelationRequestDto.builder()
                .productRelationInfo("info1")
                .fromCharacter(fromCharacterRequestDto)
                .toCharacter(toCharacterRequestDto)
                .sourceHandle("a")
                .targetHandle("b")
                .targetId(1L)
                .sourceId(1L)
                .build();

        ProductRelationRequestDto productRelation4 = ProductRelationRequestDto.builder()
                .productRelationInfo("info2")
                .fromCharacter(fromCharacterRequestDto)
                .toCharacter(toCharacterRequestDto)
                .sourceHandle("a")
                .targetHandle("b")
                .targetId(1L)
                .sourceId(1L)
                .build();

        ProductRelationRequestDto productRelation5 = ProductRelationRequestDto.builder()
                .productRelationInfo("info3")
                .fromCharacter(fromCharacterRequestDto)
                .toCharacter(toCharacterRequestDto)
                .sourceHandle("a")
                .targetHandle("b")
                .targetId(1L)
                .sourceId(1L)
                .build();

        List<ProductRelationRequestDto> productRelations = new ArrayList<>();
        productRelations.add(productRelation3);
        productRelations.add(productRelation4);
        productRelations.add(productRelation5);

        //when
        productRelationService.updateAllProductRelation(product.getId(), productRelations);
        List<ProductRelation> result = productRelationService.findAllProductRelation(product.getId());

        //then
        Assertions.assertEquals(result.size(), 3);
    }

    @Test
    void 인물관계삭제() throws Exception {
        //given
        ProductRelation productRelation = ProductRelation.builder()
                .product(product)
                .productRelationInfo("info")
                .fromCharacter(fromCharacter)
                .toCharacter(toCharacter)
                .build();
        productRelationService.createProductRelation(product.getId(), productRelation);

        //when
        productRelationService.deleteProductRelation(productRelation.getId());

        //then
        assertEquals(productRelationService.findAllProductRelation(product.getId()).size(), 0);
    }
}