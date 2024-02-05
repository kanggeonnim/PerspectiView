package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.category.Category;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRepository;
import com.example.backend.modules.team.Team;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.assertj.core.api.Assertions;
import org.junit.Test;
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
    GenreRepository genreRepository;

    @PersistenceContext
    private EntityManager em;

    @BeforeEach
    public void setup() {
//        Category category1 = Category.builder().name("webtoon").build();
//        Category category2 = Category.builder().name("novel").build();
//
//        em.persist(category1);
//        em.persist(category2);
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
        Product result = productService.createTeamProduct(user, team.getId(), product, genres);

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

        productService.createTeamProduct(user, team.getId(), product, genres);

        //update
        Product updateProduct = Product.builder()
                .id(1L)
                .team(team)
                .title("작품3")
                .info("eng plz")
                .image("image")
                .category(category2)
                .build();
        List<Genre> updateGenres = new ArrayList<>();
        Optional<Genre> genre =genreRepository.findById(2L);
        System.out.println("실행전!! 바꿀 리스트에 장르 추가하자~~: "+genre.get().getGenreName());
        updateGenres.add(genre.get());

        //when
        Product result = productService.updateProduct(user, team.getId(), updateProduct, updateGenres);
        for (ProductGenre pg : result.getProductGenres()){
            Optional<ProductGenre> productGenre = productGenreRepository.findById(pg.getId());

//            System.out.println(productGenre.get().getGenre().getGenreName());
        }

        //then
        assertEquals("작품의 이름이 다릅니다.", "작품3", result.getTitle());
        assertEquals("작품의 설명이 다릅니다.", "eng plz", result.getInfo());
        assertEquals("작품의 image url이 다릅니다.", "image", result.getImage());
        assertEquals("작품의 카테고리가 다릅니다.", "novel", result.getCategory().getName());
        assertEquals("작품의 장르가 1개 생성되어야",1,result.getProductGenres().size());
    }

    @Test
    public void updateProductTitle() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void deleteProduct() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void findByProductId() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void findGenreList() throws Exception {
        //given

        //when

        //then
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