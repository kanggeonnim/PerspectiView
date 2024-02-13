package com.example.backend.modules.category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponseDto {
    private Long categoryId;
    private String categoryName;

    public static CategoryResponseDto of(Category category) {
        return CategoryResponseDto.builder()
                .categoryId(category.getId())
                .categoryName(category.getName())
                .build();
    }

}
