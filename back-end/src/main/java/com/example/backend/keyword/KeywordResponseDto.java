package com.example.backend.keyword;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KeywordResponseDto {
    private Long keywordId;
    private String KeywordName;

    public static KeywordResponseDto of(Keyword keyword){
        return KeywordResponseDto.builder()
                .keywordId(keyword.getId())
                .KeywordName(keyword.getName())
                .build();
    }
}
