package com.example.backend.modules.story;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoryUpdateRequestDto {
    private String storyTitle;
    private ContentDto storyContent;

    public static Story from (StoryUpdateRequestDto storyUpdateRequestDto){
        return Story.builder()
                .title(storyUpdateRequestDto.getStoryTitle())
                .content(ContentDto.from(storyUpdateRequestDto.getStoryContent()))
                .build();
    }
}
