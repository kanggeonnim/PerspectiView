package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StoryResponseDto {
    private Long storyId;
    private String storyTitle;
    private List<Character> characters;
    private List<ForeShadowing> foreShadowings;
    private Content content;
    private int positionX;
    private Double positionY;

    public static StoryResponseDto from(Story story, List<Character> characters, List<ForeShadowing> foreShadowings){
        return StoryResponseDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .characters(characters)
                .foreShadowings(foreShadowings)
                .content(story.getContent())
                .positionX(story.getPositionX())
                .positionY(story.getPositionY())
                .build();
    }

}
