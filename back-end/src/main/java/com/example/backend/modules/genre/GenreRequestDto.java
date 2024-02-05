package com.example.backend.modules.genre;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenreRequestDto {
    @NotNull
    private String name;

    public Genre toEntity() {
        return Genre.builder().genreName(name).build();

    }
}
