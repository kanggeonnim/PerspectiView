package com.example.backend.modules.keyword;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class KeywordRequestDto {
    @NotNull
    private String name;

    public Keyword toEntity() {
        return Keyword.builder().name(name).build();
    }
}
