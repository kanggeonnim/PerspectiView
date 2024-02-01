package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.category.CategoryResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;

@Data
@Builder
public class ProductResponseDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private Category category;
    //플롯 hashset - 스토리까지 todo entitygraph

    public static ProductResponseDto from(Product product){
        return ProductResponseDto.builder()
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productInfo(product.getInfo())
                .category(product.getCategory())
                .build();
    }
}
