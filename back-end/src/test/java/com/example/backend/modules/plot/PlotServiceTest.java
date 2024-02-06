package com.example.backend.modules.plot;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.story.*;
import com.example.backend.modules.team.EnrollmentRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.junit.Assert.*;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PlotServiceTest {
    @Autowired
    StoryRepository storyRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Autowired
    PlotRepository plotRepository;

    @Autowired
    PlotService plotService;

    @Autowired
    ContentRepository contentRepository;

    @Autowired
    StoryService storyService;

    @Autowired
    StoryForeShadowingRepository storyForeShadowingRepository;

    @Autowired
    ForeShadowingRepository foreShadowingRepository;
    @Autowired
    TeamService teamService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    EnrollmentRepository enrollmentRepository;
    @PersistenceContext
    private EntityManager em;

    @BeforeEach
    public void setup() {
        plotRepository.deleteAll();
        productRepository.deleteAll();
    }

    private Product createProduct(Team team) {
        Product product = Product.builder()
                .title("productTitle")
                .productImageuRL("product.image")
                .info("info")
                .team(team)
                .build();
        return productRepository.save(product);
    }
    private Plot createPlot(Product product){
        Plot plot = Plot.builder()
                .name("plotname")
                .color("red")
                .product(product)
                .build();

        return plotRepository.save(plot);
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
    public void 수정권한확인() throws Exception{
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        Product product = createProduct(team);
        Plot plot = createPlot(product);
        System.out.println(product.getTeam().getClass());
        System.out.println(product.getTeam());

        //when
        Boolean isteamproduct = plotService.canChange(team.getId(), product.getId(), plot);

        //then
        assertEquals("멤버아님",true, isteamproduct );
    }
    @Test
    public void createPlot() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        Product product = createProduct(team);
        Plot plot = createPlot(product);

        //given
//        List<Product> products = productRepository.findAll();
//        for (Product p : products) {
//            System.out.println(p.getTitle());
//        }

        //when
        plotService.createPlot(user, team.getId(), product.getId(), plot);
        List<Plot> result = plotService.findByProductId(user, team.getId(), product.getId());
        //then
        assertEquals("plot 이름이 다릅니다. ", "plotname", result.get(0).getName());
        assertEquals("plot color가 다릅니다. ", "red", result.get(0).getColor());

    }

    @Test
    public void findByProductId() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        Product product = createProduct(team);
        Plot plot = createPlot(product);

        //given
        List<Product> products = productRepository.findAll();

        for (Product p : products) {
            System.out.println(p.getTitle());
        }
        Product findProduct = productService.findByProductId(user, 1L, product.getId());

        //when
        plotService.createPlot(user, team.getId(), product.getId(), plot);
        List<Plot> result = plotService.findByProductId(user, team.getId(), product.getId());
        //then
        assertEquals("plot 이름이 다릅니다. ", "plotname", result.get(0).getName());
        assertEquals("plot color가 다릅니다. ", "red", result.get(0).getColor());

    }

    @Test
    public void updatePlot() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        Product product = createProduct(team);
        Plot plot = createPlot(product);

        //given
        List<Product> products = productRepository.findAll();

        for (Product p : products) {
            System.out.println(p.getTitle());
        }
        Product findProduct = productService.findByProductId(user, team.getId(), product.getId());

        Plot updatePlot = Plot.builder()
                .id(plot.getId())
                .name("플롯이름")
                .color("레드")
                .product(product)
                .build();

        //when
        plotService.createPlot(user, team.getId(), product.getId(), plot);

        Plot result = plotService.updatePlot(user, team.getId(), findProduct.getId(), updatePlot);

        //then
        assertEquals("plot 이름이 다릅니다. ", "플롯이름", result.getName());
        assertEquals("plot color가 다릅니다. ", "레드", result.getColor());
    }

    @Test
    public void deletePlot() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);
        Product product = createProduct(team);
        Plot plot = createPlot(product);

        //given
        List<Product> products = productRepository.findAll();

        for (Product p : products) {
            System.out.println(p.getTitle());
        }
        Product findProduct = productService.findByProductId(user, 1L, product.getId());

        //when
        plotService.createPlot(user, team.getId(), product.getId(), plot);

        System.out.println("plot 개수: " + plotRepository.findAll());

        plotService.deletePlot(user, team.getId(), product.getId(), plot.getId());

        //then
        System.out.println("plot 개수: " + plotRepository.findAll());
    }
}