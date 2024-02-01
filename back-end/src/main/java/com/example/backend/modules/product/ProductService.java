package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.account.UserService;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRepository;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    private final TeamService teamService;

    private final ProductGenreRepository productGenreRepository;

    private final GenreRepository genreRepository;

    /**
     * 유저가 작품을 수정할 수 있는지 확인
     */
    public boolean canChange(User user, Team team, Product product) {
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀에 속하는 작품인지 확인
        if (!product.isProductTeam(team)) {
            return false;
        }
        return true;
    }

    /**
     * 유저가 작품을 조회 할 수 있는지 확인
     */

    /**
     * 팀 작품 생성
     */
    @Transactional
    public Product createTeamProduct(User user, Team team, Product product, List<Genre> genres) { //TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀이 1인팀이 아닌지 확인
        if (team.isPersonal()) {
            throw new RuntimeException();
        }

        //중간 테이블 저장
        //장르 + 작품에 대한 값이 있어야함
        for (Genre g : genres) {
            Genre genre = genreRepository.findById(g.getId()).orElseThrow(() -> new RuntimeException());
            product.addProductGenre(productGenreRepository.save(new ProductGenre(product, genre)));
        }

        return productRepository.save(product);
    }

    /**
     * 팀 작품 수정
     */
    @Transactional
    public Product updateProduct(User user, Team team, Product product, List<Genre> genres) {//TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀에 속하는 작품인지 확인
        if (!product.isProductTeam(team)) {
            throw new RuntimeException();
        }

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findById(product.getId()).orElseThrow(() -> new RuntimeException());

        //원래 있던 장르작품 삭제하고
        for (ProductGenre pg : findProduct.getProductGenres()) {
            productGenreRepository.deleteById(pg.getId());
        }

        //다시 만들어서 add
        for (Genre g : genres) {
            Genre genre = genreRepository.findById(g.getId()).orElseThrow(() -> new RuntimeException());
            product.addProductGenre(productGenreRepository.save(new ProductGenre(findProduct, genre)));
        }

        findProduct.updateProduct(product.getTitle(), product.getInfo(), product.getCategory());
        return findProduct;
    }

    /**
     * 팀 작품 이름만 수정
     */
    public Product updateProductTitle(User user, Team team, Product product) {
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀에 속하는 작품인지 확인
        if (!product.isProductTeam(team)) {
            throw new RuntimeException();
        }

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findById(product.getId()).orElseThrow(() -> new RuntimeException());

        findProduct.updateProductTitle(product.getTitle());
        return findProduct;
    }

    /**
     * 팀 작품 삭제
     */
    @Transactional
    public void deleteProduct(User user, Team team, Long productId) {//TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findById(productId).orElseThrow(() -> new RuntimeException());

        //팀에 속하는 작품인지 확인
        if (!findProduct.isProductTeam(team)) {
            throw new RuntimeException();
        }

        productRepository.deleteById(productId);
    }

    /**
     * 팀 작품 아이디로 하나 조회
     */
    public Product findByProductId(User user, Team team, Long productId) {//TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfMember(user, team);
        Product findProduct = productRepository.findById(productId).orElseThrow(() -> new RuntimeException());

        //팀에 속하는 작품인지 확인
        if (!findProduct.isProductTeam(team)) {
            throw new RuntimeException();
        }

        return findProduct;
    }

    /**
     * 작품장르 리스트로 장르 리스트 주기
     */
    public List<Genre> findGenreList(Set<ProductGenre> productGenres) {
        List<Genre> genres = new ArrayList<>();
        for (ProductGenre pg : productGenres) {
            Genre genre = genreRepository.findById(pg.getGenre().getId()).orElseThrow(() -> new RuntimeException());
        }
        return genres;
    }

    /** todo
     * 팀 인물 관계 조회
     */

    /** todo
     * 팀 플롯 전체 조회
     */
}
