package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.account.UserService;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepository;

    private final TeamService teamService;

    /**
     * 유저가 작품을 수정할 수 있는지 확인
     */
    public boolean canChange(User user, Team team,Product product){
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
    public Product createTeamProduct(User user, Team team, Product product) { //TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀이 1인팀이 아닌지 확인
        if (team.isPersonal()) {
            throw new RuntimeException();
        }

        //product 생성
        Product makeProduct = Product.builder()
                .title(product.getTitle())
                .info(product.getInfo())
                .team(team)
                .category(product.getCategory())
                .build();

        return productRepository.save(product);
    }

    /**
     * 1인팀 작품 생성
     */
    @Transactional
    public Product createPersonalProduct(User user, Team team, Product product) {//TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀이 1인팀이 아닌지 확인
        if (!team.isPersonal()) {
            throw new RuntimeException();
        }

        //product 생성
        Product makeProduct = Product.builder()
                .title(product.getTitle())
                .info(product.getInfo())
                .team(team)
                .category(product.getCategory())
                .build();

        return productRepository.save(product);
    }

    /**
     * 팀 작품 수정
     */
    @Transactional
    public Product updateProduct(User user, Team team, Product product) {//TODO EntityGraph
        //유저가 팀의 매니저인지 확인
        teamService.checkIfManager(user, team);

        //팀에 속하는 작품인지 확인
        if (!product.isProductTeam(team)) {
            throw new RuntimeException();
        }

        //작품 아이디로 찾아오기
        Product findProduct = productRepository.findById(product.getId()).orElseThrow(() -> new RuntimeException());


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
        Product findProduct = productRepository.findById(productId).orElseThrow(()->new RuntimeException());

        //팀에 속하는 작품인지 확인
        if (!findProduct.isProductTeam(team)) {
            throw new RuntimeException();
        }



        return findProduct;
    }


    /** todo
     * 팀 인물 관계 조회
     */

    /** todo
     * 팀 플롯 전체 조회
     */
}
