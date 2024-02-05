package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.category.Category;
import com.example.backend.modules.category.CategoryService;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
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

    @PersistenceContext
    private EntityManager em;

    @BeforeAll
    public void setup() {

    }

    @Test
    public void createTeamProduct() throws Exception {
        //given
        User user = new User();
        Team team = new Team();

        Category category1 = Category.builder().name("webtoon").build();

        Genre genre1 = Genre.builder().genreName("SF").build();
        Genre genre2 = Genre.builder().genreName("액션").build();
        em.persist(genre1);
        em.persist(genre2);

        Product product = Product.builder()
                .team(team)
                .title("작품1")
                .info("작품에 대한 설명")
                .image("image_url")
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
        assertEquals("작품의 image url이 다릅니다.", "image_url", result.getImage());
        assertEquals("작품의 카테고리가 다릅니다.", "webtoon", result.getCategory().getName());
        assertEquals("작품의 장르가 2개 생성되어야",2,result.getProductGenres().size());
    }

    @Test
    public void updateProduct() throws Exception {
        //given
        User user = new User();
        Team team = new Team();

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
                .image("image_url")
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
                .image("image")
                .category(category2)
                .build();
        List<Genre> updateGenres = new ArrayList<>();
        Optional<Genre> genre =genreRepository.findById(2L);
//        System.out.println("실행전!! 바꿀 리스트에 장르 추가하자~~: "+genre.get().getGenreName());
        updateGenres.add(genre.get());

        //when
        Product result = productService.updateProduct(1L,updateProduct, updateGenres);
        for (ProductGenre pg : result.getProductGenres()){
            Optional<ProductGenre> productGenre = productGenreRepository.findById(pg.getId());
        }

        //then
        assertEquals("작품의 이름이 다릅니다.", "작품3", result.getTitle());
        assertEquals("작품의 설명이 다릅니다.", "eng plz", result.getInfo());
        assertEquals("작품의 image url이 다릅니다.", "image", result.getImage());
        assertEquals("작품의 카테고리가 다릅니다.", "novel", result.getCategory().getName());
//        assertEquals("작품의 장르가 1개 생성되어야",1,result.getProductGenres().size());
    }

    @Test
    public void updateProductTitle() throws Exception {
        //given
        User user = new User();
        Team team = new Team();

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
                .image("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        //updaet
        Product updaetProduct = Product.builder()
                .title("작품2")
                .build();

        //when
        Product result = productService.updateProductTitle(1L, updaetProduct);

        //then
        assertEquals("작품의 이름이 다릅니다.", "작품2", result.getTitle());
    }

    @Test
    public void deleteProduct() throws Exception {
        //given
        User user = new User();
        Team team = new Team();

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
                .image("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        //when
        productService.deleteProduct(1L);

        //then
        productService.findByProductId(user, team.getId(), 1L);
        fail("해당 아이디로 찾을 수 없어야한다.");
    }

    @Test
    public void findByProductId() throws Exception {
        //given
        User user = new User();
        Team team = new Team();

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
                .image("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        //when
        Product result = productService.findByProductId(user, team.getId(), 1L);

        //then
        assertEquals("제목이 작품1이어야합니다.","작품1", result.getTitle());
    }

    @Test
    public void findGenreList() throws Exception {
//given
        User user = new User();
        Team team = new Team();

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
                .image("image_url")
                .category(category1)
                .build();
        List<Genre> genres = new ArrayList<>();
        genres.add(genre1);
        genres.add(genre2);

        productService.createTeamProduct(product, genres);

        Product product1 = productService.findByProductId(user, team.getId(), 1L);
        //when
        System.out.println("작품장르 길이: "+ product1.getProductGenres().size());
        List<Genre> result = productService.findGenreList(product1.getProductGenres());
        //then
        assertEquals("장르 이름이 SF이어야합니다.","SF", result.get(0).getGenreName());
        assertEquals("장르 이름이 액션이어야합니다.","액션", result.get(1).getGenreName());
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

        //when

        //then
    }
}