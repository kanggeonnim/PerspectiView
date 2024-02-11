package com.example.backend.modules.productrelation;

import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.story.StoryRelationRepository;
import com.example.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public ProductRelation createProductRelation(Long productId, ProductRelation productRelation) {
        Product product = productService.findByProductId(productId);
        productRelation.updateProduct(product);
        ProductRelation newProductRelation = productRelationRepository.save(productRelation);
        return newProductRelation;
    }

    /**
     * 전체 인물관계 조회
     */
    public List<ProductRelation> findAllProductRelation(Long productId) {
        Product product = productService.findByProductId(productId);
        List<ProductRelation> productRelations = productRelationRepository.findByProduct(product);
        return productRelations;
    }

    /**
     * 단일 인물관계 조회
     */
    public ProductRelation findProductRelation(Long productRelationId) {
        ProductRelation productRelation = productRelationRepository.findById(productRelationId)
                .orElseThrow(() -> new NotFoundException());
        return productRelation;
    }

    /**
     * 인물관계 수정
     */
    @Transactional
    public ProductRelation updateProductRelation(Long productRelationId, ProductRelation productRelation) {
        ProductRelation findProductRelation = productRelationRepository.findById(productRelationId)
                .orElseThrow(() -> new NotFoundException());
        findProductRelation.updateProductRelation(productRelation);
        return findProductRelation;
    }

    @Transactional
    public void deleteProductRelation(Long productRelationId) {
        productRelationRepository.deleteById(productRelationId);
    }

    @Transactional
    public List<ProductRelationResponseDto> updateAllProductRelation(Long productId, List<ProductRelationRequestDto> productRelationRequestDtos) {
        Product product = productService.findByProductId(productId);
        productRelationRepository.deleteAll(product.getProductRelations());
        List<ProductRelationResponseDto> productRelations = new ArrayList<>();

        productRelationRequestDtos.stream().collect(Collectors.toList()).stream()
                .map(ProductRelationRequestDto::from)
                .map(productRelation -> productRelation.updateProduct(product))
                .map(productRelationRepository::save)
                .map(ProductRelationResponseDto::of)
                .forEach(productRelationResponseDto -> productRelations.add(productRelationResponseDto));
        return productRelations;
    }
}
