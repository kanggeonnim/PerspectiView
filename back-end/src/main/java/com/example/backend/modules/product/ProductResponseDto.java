package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.category.CategoryResponseDto;
import com.example.backend.modules.genre.Genre;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.List;

@Data
@Builder
public class ProductResponseDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private Category category;
    private List<Genre> genres;
    //플롯 hashset - 스토리까지 todo entitygraph

    public static ProductResponseDto from(Product product, List<Genre> genres){
        return ProductResponseDto.builder()
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productInfo(product.getInfo())
                .category(product.getCategory())
                .genres(genres)
                .build();
    }
}
