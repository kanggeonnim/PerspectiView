package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.team.Team;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.List;

@Data
@Builder
public class ProductRequestDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private Category category;
    private List<Genre> genres;
    private Team team;

    public Product of(ProductRequestDto productRequestDto){
        return Product.builder()
                .title(productRequestDto.getProductTitle())
                .info(productRequestDto.getProductInfo())
                .category(productRequestDto.getCategory())
                .build();
    }
}
