package com.example.backend.modules.genre;

import com.example.backend.modules.api.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/genre")
public class GenreController {
    private final GenreServeice genreServeice;

    @GetMapping
    public ApiResult<List<GenreResponseDto>> genreFindAll() {
        List<Genre> genres = genreServeice.getGenres();
        return ApiResult.OK(genres.stream().map(GenreResponseDto::of)
                .collect(Collectors.toList()));
    }

}
