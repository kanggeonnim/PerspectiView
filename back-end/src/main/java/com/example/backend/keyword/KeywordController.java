package com.example.backend.keyword;

import com.example.backend.modules.api.ApiError;
import com.example.backend.modules.api.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/keyword")
public class KeywordController {
    private final KeywordService keywordService;

    @PostMapping("/")
    public ApiResult<KeywordResponseDto> createKeyword(@RequestBody KeywordRequestDto keywordRequestDto) {
        Keyword keyword = keywordService.createKeyword(keywordRequestDto.toEntity());
        return ApiResult.OK(KeywordResponseDto.of(keyword));
    }

    @GetMapping("/{keywordId}")
    public ApiResult<KeywordResponseDto> keywordFindById(@PathVariable("keywordId") Long id) {
        Optional<Keyword> keyword = keywordService.findById(id);
        return ApiResult.OK(KeywordResponseDto.of(keyword.get()));
    }

    @GetMapping("/name/{keywordName}")
    public ApiResult<List<KeywordResponseDto>> keywordFindByName(@PathVariable("keywordName") String name) {
        List<Keyword> keywords = keywordService.findKeywordByName(name);
        return ApiResult.OK(keywords.stream().map(KeywordResponseDto::of)
                .collect(Collectors.toList()));
    }

    @GetMapping("/")
    public ApiResult<List<KeywordResponseDto>> keysordFindAll() {
        List<Keyword> keywords = keywordService.findAll();
        return ApiResult.OK(keywords.stream().map(KeywordResponseDto::of)
                .collect(Collectors.toList()));
    }


}
