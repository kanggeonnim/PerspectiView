package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ForeShadowingResponseDto {
    Long foreShadowingId;
    String foreShadowingName;
    String foreShadowingContent;
    boolean foreShadowingClose;
    List<Long> storyList;

//    public static ForeShadowingResponseDto from(ForeShadowing foreShadowing,List<Long> storyList){
    public static ForeShadowingResponseDto from(ForeShadowing foreShadowing){
        return ForeShadowingResponseDto.builder()
                .foreShadowingId(foreShadowing.getId())
                .foreShadowingName(foreShadowing.getFShadowName())
                .foreShadowingContent(foreShadowing.getFShadowContent())
                .foreShadowingClose(foreShadowing.isFShadowClose())
//                .storyList(storyList)
                .build();
    }
}
