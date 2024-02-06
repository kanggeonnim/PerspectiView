package com.example.backend.modules.foreshadowing;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForeShadowingResponseDto {
    Long foreShadowingId;
    String foreShadowingName;
    String foreShadowingContent;
    boolean foreShadowingClose;

    public static ForeShadowingResponseDto from(ForeShadowing foreShadowing){
        return ForeShadowingResponseDto.builder()
                .foreShadowingId(foreShadowing.getId())
                .foreShadowingName(foreShadowing.getFShadowName())
                .foreShadowingContent(foreShadowing.getFShadowContent())
                .foreShadowingClose(foreShadowing.isFShadowClose())
                .build();
    }
}
