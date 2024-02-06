package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.team.Team;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ProductRequestDto {
    private Long productId;
    private String productTitle;
    private MultipartFile multipartFile;
    private String productInfo;
    private Category category;
    private List<Genre> genres;
    private Team team;

    public Product from(ProductRequestDto productRequestDto, String productImageuRL){
        return Product.builder()
                .title(productRequestDto.getProductTitle())
                .info(productRequestDto.getProductInfo())
                .category(productRequestDto.getCategory())
                .productImageuRL(productImageuRL)
                .build();
    }
}
