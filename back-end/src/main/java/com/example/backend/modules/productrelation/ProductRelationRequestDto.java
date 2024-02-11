package com.example.backend.modules.productrelation;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterRequestDto;
import com.example.backend.modules.product.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductRelationRequestDto {
    private Long productRelationId;
    private CharacterRequestDto fromCharacter;
    private CharacterRequestDto toCharacter;
    private String productRelationInfo;
    private Long sourceId;
    private Long targetId;
    private String sourceHandle;
    private String targetHandle;


    public ProductRelation from(ProductRelationRequestDto productRelationRequestDto) {
        return ProductRelation.builder()
                .sourceId(productRelationRequestDto.getSourceId())
                .tagetId(productRelationRequestDto.getTargetId())
                .sourceHandle(productRelationRequestDto.getSourceHandle())
                .targetHandle(productRelationRequestDto.getTargetHandle())
                .id(productRelationRequestDto.getProductRelationId())
                .productRelationInfo(productRelationRequestDto.getProductRelationInfo())
                .fromCharacter(CharacterRequestDto.from(productRelationRequestDto.getFromCharacter()))
                .toCharacter(CharacterRequestDto.from(productRelationRequestDto.getToCharacter()))
                .build();
    }

}
