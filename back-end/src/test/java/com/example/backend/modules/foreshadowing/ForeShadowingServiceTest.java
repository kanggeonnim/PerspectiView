package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.character.Character;
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
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Slf4j
class ForeShadowingServiceTest {

    @Autowired
    TeamService teamService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    ForeShadowingRepository foreShadowingRepository;

    @Autowired
    ForeShadowingService foreShadowingService;

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

    private Team makeTeam(User user) {
        Team team = Team.builder().title("team1")
                .info("team info")
                .profileImageUrl("https://s3")
                .personal(false)
                .build();
        return teamService.createTeam(team, user);
    }


    private User makeUser(String username) {
        User user = User.builder().userNickname("nickname")
                .userImage("https://s3")
                .username(username)
                .email("kangkun@naver.com")
                .provider("kakao")
                .providerId("kakao_1234")
                .userInfo("bio")
                .build();

        userRepository.save(user);
        return user;
    }

    @Test
    void 복선생성테스트() throws Exception {
        //given
        ForeShadowing foreShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowName("fshName")
                .fShadowContent("fshContent")
                .fShadowClose(false)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        //when
        ForeShadowing createdFS = foreShadowingService.createForeShadowing(user, team.getId(), product.getId(), foreShadowing);

        //then
        assertEquals(createdFS.getFShadowName(), foreShadowing.getFShadowName());
    }

}