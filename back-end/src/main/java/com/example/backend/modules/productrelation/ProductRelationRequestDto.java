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
    private String productRelationInfo;
    private String sourceHandle;
    private String targetHandle;


    public ProductRelation from(ProductRelationRequestDto productRelationRequestDto) {
        return ProductRelation.builder()
                .sourceHandle(productRelationRequestDto.getSourceHandle())
                .targetHandle(productRelationRequestDto.getTargetHandle())
                .id(productRelationRequestDto.getProductRelationId())
                .productRelationInfo(productRelationRequestDto.getProductRelationInfo())
                .fromCharacter(productRelationRequestDto.getFromCharacter())
                .toCharacter(productRelationRequestDto.getToCharacter())
                .build();
    }

}
