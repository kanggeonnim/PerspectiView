package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FshadowStoryDto {
    private Long storyId;
    private String storyTitle;

    public static FshadowStoryDto of(Story story){
        return FshadowStoryDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .build();
    }
}
