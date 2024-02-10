package com.example.backend.modules.foreshadowing;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ForeShadowingResponseDto {
    Long fShadowId;
    String columnId;
    String fshadowName;
    String fshadowContent;
    List<FshadowStoryIdDto> storyIdList;
    Long fshadowClose;

    public static ForeShadowingResponseDto of(ForeShadowing foreShadowing, List<FshadowStoryIdDto> storyIdList, String columnId){
        return ForeShadowingResponseDto.builder()
                .fShadowId(foreShadowing.getId())
                .fshadowName(foreShadowing.getFShadowName())
                .fshadowContent(foreShadowing.getFShadowContent())
                .fshadowClose(foreShadowing.getFShadowClose())
                .columnId(columnId)
                .storyIdList(storyIdList)
                .build();
    }
}
