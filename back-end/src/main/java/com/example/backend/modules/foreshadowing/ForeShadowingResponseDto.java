package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class ForeShadowingResponseDto {
    Long fShadowId;
    String fshadowName;
    String fshadowContent;
    List<FshadowStoryIdDto> storyIdList;
    Long fshadowClose;

    public static ForeShadowingResponseDto from(ForeShadowing foreShadowing,List<FshadowStoryIdDto> storyIdList){
        return ForeShadowingResponseDto.builder()
                .fShadowId(foreShadowing.getId())
                .fshadowName(foreShadowing.getFShadowName())
                .fshadowContent(foreShadowing.getFShadowContent())
                .fshadowClose(foreShadowing.getFShadowClose())
                .storyIdList(storyIdList)
                .build();
    }
}
