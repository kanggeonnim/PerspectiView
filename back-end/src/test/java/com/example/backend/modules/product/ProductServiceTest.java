package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.category.CategoryService;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.team.EnrollmentRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ProductServiceTest {
    @Autowired
    ProductService productService;

    @Autowired
    ProductGenreRepository productGenreRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    GenreRepository genreRepository;

    @Autowired
    PlotRepository plotRepository;

    @Autowired
    ProductRepository productRepository;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    EnrollmentRepository enrollmentRepository;

    @BeforeEach
    public void alldelete() {
        userRepository.deleteAll();
        teamRepository.deleteAll();
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

    private Product createProduct(Team team) {
        Product product = Product.builder()
                .title("productTitle")
                .productImageuRL("product.image")
                .info("info")
                .team(team)
                .build();
        return productRepository.save(product);
    }

    private Plot createPlot(Product product, String plotName) {
        Plot plot = Plot.builder()
                .name(plotName)
                .color("red")
                .product(product)
                .build();

        return plotRepository.save(plot);
    }

    @Test
    public void createTeamProduct() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder().genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        //when
        Product result = productService.createTeamProduct(product, genres);

        //then
        assertEquals("작품의 이름이 작품1이어야합니다.", "작품1", result.getTitle());
        assertEquals("작품의 설명이 다릅니다.", "작품에 대한 설명", result.getInfo());
        assertEquals("작품의 image url이 다릅니다.", "image_url", result.getProductImageuRL());
        assertEquals("작품의 카테고리가 다릅니다.", "webtoon", result.getCategory().getName());
        assertEquals("작품의 장르가 2개 생성되어야", 2, result.getProductGenres().size());
    }

    @Test
    public void updateProduct() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();
        em.persist(category1);
        em.persist(category2);

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder()
                .genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        //update
        Product updateProduct = Product.builder()
                .team(team)
                .title("작품3")
                .info("eng plz")
                .productImageuRL("image")
                .category(category2)
                .build();
        List<Genre> updateGenres = new ArrayList<>();
        Optional<Genre> genre = genreRepository.findById(2L);
        updateGenres.add(genre.get());

        //when
        Product result = productService.updateProduct(1L, updateProduct, updateGenres);

        em.flush();
        em.clear();

        Product findResult = productService.findByProductId(user, team.getId(), result.getId());

        //then
        assertEquals("작품의 이름이 다릅니다.", "작품3", findResult.getTitle());
        assertEquals("작품의 설명이 다릅니다.", "eng plz", findResult.getInfo());
        assertEquals("작품의 image url이 다릅니다.", "image", findResult.getProductImageuRL());
        assertEquals("작품의 카테고리가 다릅니다.", "novel", findResult.getCategory().getName());
        assertEquals("작품의 장르가 1개 생성되어야", 1, findResult.getProductGenres().size());
    }

    @Test
    public void updateProductTitle() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();
        em.persist(category1);
        em.persist(category2);

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder()
                .genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        Product givenProduct = productService.createTeamProduct(product, genres);

        //updaet
        Product updaetProduct = Product.builder()
                .title("작품2")
                .build();

        //when
        Product result = productService.updateProductTitle(givenProduct.getId(), updaetProduct);

        //then
        assertEquals("작품의 이름이 다릅니다.", "작품2", result.getTitle());
    }

    @Test
    public void deleteProduct() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();
        em.persist(category1);
        em.persist(category2);

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder()
                .genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        //when
        productService.deleteProduct(1L);

        //then
//        productService.findByProductId(user, team.getId(), 1L);
//        fail("해당 아이디로 찾을 수 없어야한다.");
    }

    @Test
    public void findByProductId() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();
        em.persist(category1);
        em.persist(category2);

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder()
                .genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        Product givenProduct = productService.createTeamProduct(product, genres);

        //when
        Product result = productService.findByProductId(user, team.getId(), givenProduct.getId());

        //then
        assertEquals("제목이 작품1이어야합니다.", "작품1", result.getTitle());
    }

    @Test
    public void findGenreList() throws Exception {
//given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Category category1 = Category.builder().name("webtoon").build();
        Category category2 = Category.builder().name("novel").build();
        em.persist(category1);
        em.persist(category2);

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder()
                .genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .productImageuRL("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        Product givenProduct = productService.createTeamProduct(product, genres);

        Product product1 = productService.findByProductId(user, team.getId(), givenProduct.getId());
        //when
        System.out.println("작품장르 길이: " + product1.getProductGenres().size());
        List<Genre> result = productService.findGenreList(product1.getProductGenres());
        //then
        assertEquals("장르 이름이 SF이어야합니다.", "SF", result.get(0).getGenreName());
        assertEquals("장르 이름이 액션이어야합니다.", "액션", result.get(1).getGenreName());
    }

    @Test
    public void findProductRelations() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void findPlots() throws Exception {
        //given
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        Product product = createProduct(team);
        Plot plot1 = createPlot(product, "플롯1");
        Plot plot2 = createPlot(product, "플롯2");

        em.flush();
        em.clear();

        Product findProduct = productService.findByProductId(user, team.getId(), product.getId());


        //when
        List<Plot> plots = productService.findPlots(findProduct.getId());
        //then
        assertEquals(2, plots.size());
        assertEquals("플롯1",plots.get(0).getName());
        assertEquals("플롯2",plots.get(1).getName());
    }
}