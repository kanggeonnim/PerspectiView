package com.example.backend.modules.productrelation;

import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductRelationService {
    private final ProductRelationRepository productRelationRepository;
    private final ProductService productService;

    /**
     * 작품 인물 관계 생성
     *
     * @param productRelation
     * @return
     */
    @Transactional
    public ProductRelation createProductRelation(ProductRelation productRelation) {
        ProductRelation newProductRelation = productRelationRepository.save(productRelation);
        return newProductRelation;
    }

    /**
     * 전체 인물관계 조회
     */
    public List<ProductRelation> findAllProductRelation(User user, Long teamId, Long productId) {
        Product product = productService.findByProductId(user, teamId, productId);
        List<ProductRelation> productRelations = productRelationRepository.findAllByProduct(product);
        return productRelations;
    }

    /**
     * 단일 인물관계 조회
     */
    public ProductRelation findProductRelation(User user, Long teamId, Long productRelationId) {
        ProductRelation productRelation = productRelationRepository.findById(productRelationId)
                .orElseThrow(() -> new RuntimeException());
        return productRelation;
    }

    /**
     * 인물관계 수정
     */
    @Transactional
    public ProductRelation updateProductRelation(Long productRelationId, ProductRelation productRelation) {
        ProductRelation findProductRelation = productRelationRepository.findById(productRelationId)
                .orElseThrow(() -> new RuntimeException());
        findProductRelation.updateProductRelation(productRelation);
        return findProductRelation;
    }

    @Transactional
    public void deleteProductRelation(Long productRelationId) {
        productRelationRepository.deleteById(productRelationId);
    }
}
