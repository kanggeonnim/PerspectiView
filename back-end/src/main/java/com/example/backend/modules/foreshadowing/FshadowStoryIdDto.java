package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FshadowStoryIdDto {
    private Long storyId;

    public static FshadowStoryIdDto from(Story story){
        return FshadowStoryIdDto.builder()
                .storyId(story.getId())
                .build();
    }
}
