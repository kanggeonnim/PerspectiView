package com.example.backend.modules.productrelation;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.character.Character;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.product.Product;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductRelationResponseDto {
    private Long productRelationId;
    private Character fromCharacter;
    private Character toCharacter;
    private Product product;
    private String productRelationInfo;

    public static ProductRelationResponseDto of(ProductRelation productRelation) {
        return ProductRelationResponseDto.builder()
                .productRelationId(productRelation.getId())
                .product(productRelation.getProduct())
                .productRelationInfo(productRelation.getProductRelationInfo())
                .fromCharacter(productRelation.getFromCharacter())
                .toCharacter(productRelation.getToCharacter())
                .build();
    }
}
