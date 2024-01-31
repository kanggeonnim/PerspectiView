package com.example.backend.modules.category;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponseDto {
    private Long id;
    private String name;

    public static CategoryResponseDto of(Category category) {
        return CategoryResponseDto.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

}
