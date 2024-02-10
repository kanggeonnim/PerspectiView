package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreResponseDto;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotResponseDto;
import com.example.backend.modules.productrelation.ProductRelation;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductResponseDto {
    private Long productId;
    private String productTitle;
    private String productInfo;
    private String productImageUrl;
    private Category category;
    private List<GenreResponseDto> genres;
    private List<PlotResponseDto> plots;
    //플롯 hashset - 스토리까지 todo entitygraph

    public static ProductResponseDto of(Product product, List<GenreResponseDto> genres, List<PlotResponseDto> plots){
        return ProductResponseDto.builder()
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productInfo(product.getInfo())
                .productImageUrl(product.getProductImageuRL())
                .category(product.getCategory())
                .genres(genres)
                .plots(plots)
                .build();
    }
}
