package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.exception.NotFoundException;
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
    StoryForeShadowingRepository storyForeShadowingRepository;

    @Autowired
    ProductRepository productRepository;

    private Product product;

    @Autowired
    ContentRepository contentRepository;

    @Autowired
    PlotRepository plotRepository;

    @Autowired
    StoryRepository storyRepository;

    @BeforeEach
    public void setup() {
        product = Product.builder()
                .title("productTitle")
                .productImageuRL("image")
                .info("info")
                .build();
        productRepository.save(product);
    }

    private Story storySetting(){


        Plot plot = Plot.builder()
                .name("plotname")
                .color("red")
                .product(product)
                .build();
        Plot p = plotRepository.save(plot);


        Content content = Content.builder()
                .content("Contents: StartContents")
                .build();
        Content c = contentRepository.save(content);

        Story story = Story.builder()
                .title("storyTitle")
                .positionX(1)
                .positionY(1.0)
                .plot(p)
                .content(c)
                .storyForeShadowings(new ArrayList<>())
                .storyRelations(new ArrayList<>())
                .build();

        return storyRepository.save(story);
    }

    private Team makeTeam(User user) {
        Team team = Team.builder().title("team1")
                .info("team info")
                .personal(false)
                .build();
        return teamService.createTeam(team, user);
    }


    private User makeUser(String username) {
        User user = User.builder().userNickname("nickname")
                .userImageUrl("https://s3")
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
                .fShadowClose(null)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        //when
        ForeShadowing createdFS = foreShadowingService.createForeShadowing(foreShadowing, product.getId());

        //then
        assertEquals(createdFS.getFShadowName(), foreShadowing.getFShadowName());
    }

    @Test
    public void 복선수정테스트() throws Exception {
        //given
        ForeShadowing foreShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowName("fshName")
                .fShadowContent("fshContent")
                .fShadowClose(null)
                .build();
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        ForeShadowing createdFS = foreShadowingService.createForeShadowing(foreShadowing, product.getId());

        ForeShadowing updateFS = ForeShadowing.builder()
                .id(foreShadowing.getId())
                .product(product)
                .fShadowName("updatedName")
                .fShadowContent("fshContent")
                .fShadowClose(null)
                .build();

        //when
        ForeShadowing atferUpdate = foreShadowingService.updateForeShadowing(updateFS);

        //then
        assertEquals(atferUpdate.getFShadowName(), updateFS.getFShadowName());
    }

    @Test
    public void 복선삭제테스트() throws Exception {
        //given
        ForeShadowing foreShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowName("fshName")
                .fShadowContent("fshContent")
                .fShadowClose(null)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        foreShadowingService.createForeShadowing(foreShadowing, product.getId());

        //when
        foreShadowingService.deleteForeShadowing(foreShadowing.getId());

        //then
        List<ForeShadowing> foreShadowingList = foreShadowingService.findByProductId(product.getId());
        assertEquals(foreShadowingList.size(), 0);
    }

    @Test
    public void 복선에서스토리리스트조회() throws Exception {
        //given
        ForeShadowing setForeShadowing = ForeShadowing.builder()
                .product(product)
                .fShadowName("fshName")
                .fShadowContent("fshContent")
                .fShadowClose(null)
                .storyForeShadowings(null)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        ForeShadowing fs = foreShadowingService.createForeShadowing(setForeShadowing, product.getId());

        Story story = storySetting();
        //story 생성 후 그 중간 테이블 1개 생성
        Story findStory = storyRepository.findById(story.getId()).orElseThrow(() -> new NotFoundException());
        StoryForeShadowing sfs = StoryForeShadowing.builder()
                .story(story)
                .foreShadowing(fs)
                .build();
        storyForeShadowingRepository.save(sfs);

        //when
        //복선으로 찾아오기
        List<FshadowStoryIdDto> fshadowStoryIdDtos  = foreShadowingService.findStories(fs);

        //then
        assertEquals(story.getId(),fshadowStoryIdDtos.get(0).getStoryId());
    }
}