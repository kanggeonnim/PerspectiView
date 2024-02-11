package com.example.backend.modules.product;

import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import com.example.backend.modules.plot.PlotService;
import com.example.backend.modules.productrelation.ProductRelation;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import com.example.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    private final TeamRepository teamRepository;

    private final ProductGenreRepository productGenreRepository;

    private final GenreRepository genreRepository;

    private final PlotService plotService;

    /**
     * 팀 작품 생성
     */
    @Transactional
    public Product createTeamProduct(Product product, Long teamId,List<Genre> genres) {

        //중간 테이블 저장
        //장르 + 작품에 대한 값이 있어야함
        for (Genre g : genres) {
            Genre genre = genreRepository.findById(g.getId()).orElseThrow(() -> new NotFoundException());
            product.addProductGenre(productGenreRepository.save(new ProductGenre(product, genre)));
        }
        //팀 정보 불러와서 product에 넣기
        Team team = teamRepository.findById(teamId).orElseThrow(()->new NotFoundException());
        product.updateTeam(team);
        return productRepository.save(product);
    }

    /**
     * 팀 작품 수정
     */
    //TODO 장르 List 수정하는 로직 필요
    @Transactional
    public Product updateProduct(Long productId, Product product, List<Genre> genres) {

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findWithTeamById(productId).orElseThrow(() -> new NotFoundException());

        //원래 있던 장르작품 삭제하고
        for (ProductGenre pg : findProduct.getProductGenres()) {
            productGenreRepository.delete(pg);
        }

        List<ProductGenre> productGenres = new ArrayList<>();

        //다시 만들어서 add
        for (Genre g : genres) {
            //이미 있는 장르만 고를거니깐 그거 골라 오기
            Genre genre = genreRepository.findById(g.getId()).orElseThrow(() -> new NotFoundException());
            System.out.println("추가할 장르 이름: " + genre.getGenreName());

            ProductGenre productGenre = productGenreRepository.save(new ProductGenre(findProduct, genre));

            productGenres.add(productGenre);
        }

        findProduct.updateProduct(product.getTitle(), product.getInfo(), product.getCategory());
        if (product.getProductImageuRL() != null) {
            findProduct.updateProductImage(product.getProductImageuRL());
        }
        return findProduct;
    }

    /**
     * todo 팀에 있는 작품 전체 조회
     */
    public List<Product> productList(Long teamId){
        return productRepository.findByTeamId(teamId);
    }

    /**
     * todo 팀에 있는 작품 이름으로 검색
     */

    /**
     * 팀 작품 이름만 수정
     */
    @Transactional
    public Product updateProductTitle(Long ProductId, Product product) {

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findWithTeamById(ProductId).orElseThrow(() -> new NotFoundException());

        findProduct.updateProductTitle(product.getTitle());
        return findProduct;
    }

    /**
     * 팀 작품 삭제
     */
    @Transactional
    public void deleteProduct(Long productId) {//TODO EntityGraph
        productRepository.deleteById(productId);
    }

    /**
     * 팀 작품 아이디로 하나 조회
     */
    public Product findByProductId(Long productId) {
        Product findProduct = productRepository.findWithGenreCategoryById(productId).orElseThrow(() -> new NotFoundException());
        List<Plot> plots = plotService.findWithStoryRelationById(findProduct);
        findProduct.updatePlots(plots);
        return findProduct;
    }

    /**
     * 작품장르 리스트로 장르 리스트 주기
     */
    public List<Genre> findGenreList(Set<ProductGenre> productGenres) {
        List<Genre> genres = new ArrayList<>();
        for (ProductGenre pg : productGenres) {
            Genre genre = genreRepository.findById(pg.getGenre().getId()).orElseThrow(() -> new NotFoundException());
            genres.add(genre);
        }
        return genres;
    }

    /**
     * 작품 인물 관계 조회
     */
    public List<ProductRelation> findProductRelations(Long productId) {
        Product product = productRepository.findWithProductRelationById(productId).orElseThrow(() -> new NotFoundException());
        return product.getProductRelations().stream().toList();

    }

    /**
     * 작품 플롯 전체 조회
     */
    public List<Plot> findPlots(Long productId) {
        Product product = productRepository.findWithPlotById(productId);
        List<Plot> plots =plotService.findWithStoryRelationById(product);
        return plots;
    }
}
