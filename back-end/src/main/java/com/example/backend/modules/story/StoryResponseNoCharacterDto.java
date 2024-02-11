package com.example.backend.modules.story;

import com.example.backend.modules.character.CharacterResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class StoryResponseNoCharacterDto {
    private Long storyId;
    private String storyTitle;
    private int positionX;
    private Double positionY;

    public static StoryResponseNoCharacterDto of(Story story){
        return StoryResponseNoCharacterDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .positionX(story.getPositionX())
                .positionY(story.getPositionY())
                .build();
    }

}
