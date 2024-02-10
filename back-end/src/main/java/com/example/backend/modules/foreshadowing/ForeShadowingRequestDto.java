package com.example.backend.modules.foreshadowing;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ForeShadowingRequestDto {
    private Long id;
    @NotNull
    private String fShadowName;

    private String fshadowContent;


    public static ForeShadowing from(ForeShadowingRequestDto foreShadowingRequestDto){
        return ForeShadowing.builder()
                .id(foreShadowingRequestDto.getId())
                .fShadowName(foreShadowingRequestDto.getFShadowName())
                .fShadowContent(foreShadowingRequestDto.getFshadowContent())
//                .fShadowClose(foreShadowingRequestDto.getClose())
                .build();
    }

}
