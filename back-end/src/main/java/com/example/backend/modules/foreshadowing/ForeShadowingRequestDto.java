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

    private boolean close;

    public static ForeShadowing from(ForeShadowingRequestDto foreShadowingRequestDto) {
        return ForeShadowing.builder()
                .fShadowName(foreShadowingRequestDto.getName())
                .fShadowContent(foreShadowingRequestDto.getContent())
                .fShadowClose(foreShadowingRequestDto.isClose())
                .build();
    }

}
