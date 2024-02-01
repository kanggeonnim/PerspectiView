package com.example.backend.modules.genre;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenreResponseDto {
    private Long genreId;
    private String genreName;

    public static GenreResponseDto of(Genre genre) {
        return GenreResponseDto.builder()
                .genreId(genre.getId())
                .genreName(genre.getGenreName())
                .build();

    }
}
