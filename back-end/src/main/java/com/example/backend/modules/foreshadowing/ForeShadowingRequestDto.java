package com.example.backend.modules.foreshadowing;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForeShadowingRequestDto {
    @NotNull
    private String name;

    private String content;

    private Long close;

    public static ForeShadowing of(ForeShadowingRequestDto foreShadowingRequestDto){
        return ForeShadowing.builder()
                .fShadowName(foreShadowingRequestDto.getName())
                .fShadowContent(foreShadowingRequestDto.getContent())
                .fShadowClose(foreShadowingRequestDto.getClose())
                .build();
    }

}
