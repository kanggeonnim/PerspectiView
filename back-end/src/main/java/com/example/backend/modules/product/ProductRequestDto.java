package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.genre.GenreRequestDto;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Data
@Builder
@Slf4j
@ToString
public class ProductRequestDto {
    private String productTitle;
    private String productInfo;
    private Category category;
    private List<GenreRequestDto> genres;

    public static Product from(ProductRequestDto productRequestDto){

        return Product.builder()
                .title(productRequestDto.getProductTitle())
                .info(productRequestDto.getProductInfo())
                .category(productRequestDto.getCategory())
                .build();
    }
}
