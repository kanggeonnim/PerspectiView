package com.example.backend.modules.genre;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenreRequestDto {
    @NotNull
    private String name;

    public static Genre of(GenreRequestDto genreRequestDto) {
        return Genre.builder().genreName(genreRequestDto.getName()).build();
    }
}
