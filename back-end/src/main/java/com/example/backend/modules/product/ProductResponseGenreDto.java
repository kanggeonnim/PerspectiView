package com.example.backend.modules.product;

import com.example.backend.modules.category.CategoryResponseDto;
import com.example.backend.modules.genre.GenreResponseDto;
import com.example.backend.modules.plot.PlotResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductResponseGenreDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private String productImageUrl;
    private CategoryResponseDto category;
    private List<GenreResponseDto> genres;

    public static ProductResponseGenreDto of(Product product, List<GenreResponseDto> genres){
        return ProductResponseGenreDto.builder()
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productInfo(product.getInfo())
                .productImageUrl(product.getProductImageuRL())
                .category(CategoryResponseDto.of(product.getCategory()))
                .genres(genres)
                .build();
    }
}
