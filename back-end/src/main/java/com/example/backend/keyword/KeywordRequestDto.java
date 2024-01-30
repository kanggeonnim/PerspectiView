package com.example.backend.keyword;

import jakarta.persistence.Entity;
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
