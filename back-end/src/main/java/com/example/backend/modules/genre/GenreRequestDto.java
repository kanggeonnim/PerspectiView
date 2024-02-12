package com.example.backend.modules.genre;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class GenreRequestDto {
    private Long id;
    @NotNull
    private String name;

    public static Genre of(GenreRequestDto genreRequestDto) {
        return Genre.builder()
                .id(genreRequestDto.getId())
                .genreName(genreRequestDto.getName()).build();
    }
}
