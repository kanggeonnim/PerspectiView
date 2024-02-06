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
import java.util.Arrays;
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
    ProductRepository productRepository;

    private Product product;

    @BeforeEach
    public void setup() {
        product = Product.builder()
                .title("productTitle")
                .productImageuRL("image")
                .info("info")
                .build();
        productRepository.save(product);

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
                .fShadowClose(false)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        //when
        ForeShadowing createdFS = foreShadowingService.createForeShadowing(user, team.getId(), product.getId(), foreShadowing);

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
                .fShadowClose(false)
                .build();
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        ForeShadowing createdFS = foreShadowingService.createForeShadowing(user, team.getId(), product.getId(), foreShadowing);

        ForeShadowing updateFS = ForeShadowing.builder()
                .id(foreShadowing.getId())
                .product(product)
                .fShadowName("updatedName")
                .fShadowContent("fshContent")
                .fShadowClose(false)
                .build();

        //when
        ForeShadowing atferUpdate = foreShadowingService.updateForeShadowing(user, team.getId(), product.getId(),updateFS);

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
                .fShadowClose(false)
                .build();

        User user = makeUser("nickname");
        Team team = makeTeam(user);
        foreShadowingService.createForeShadowing(user, team.getId(), product.getId(), foreShadowing);

        //when
        foreShadowingService.deleteForeShadowing(user, team.getId(), product.getId(), foreShadowing.getId());

        //then
        List<ForeShadowing> foreShadowingList = foreShadowingService.findByProductId(user, team.getId(), product.getId());
        assertEquals(foreShadowingList.size(), 0);
    }
}