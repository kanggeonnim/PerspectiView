package com.example.backend.modules.productrelation;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.product.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductRelationRequestDto {
    private Long productRelationId;
    private Character fromCharacter;
    private Character toCharacter;
    private Product product;
    private String productRelationInfo;

    public ProductRelation from(ProductRelationRequestDto productRelationRequestDto){
        return ProductRelation.builder()
                .id(productRelationRequestDto.getProductRelationId())
                .product(productRelationRequestDto.getProduct())
                .productRelationInfo(productRelationRequestDto.getProductRelationInfo())
                .fromCharacter(productRelationRequestDto.getFromCharacter())
                .toCharacter(productRelationRequestDto.getToCharacter())
                .build();
    }

}
