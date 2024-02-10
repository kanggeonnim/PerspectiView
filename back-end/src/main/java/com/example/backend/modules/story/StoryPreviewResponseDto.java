package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterResponseDto;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
public class StoryPreviewResponseDto {
    private Long storyId;
    private String storyTitle;
    private Set<CharacterResponseDto> characters;
    private int positionX;
    private Double positionY;

    public static StoryPreviewResponseDto of(Story story, Set<Character> characters) {
        return StoryPreviewResponseDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .characters(characters.stream().map(CharacterResponseDto::of).collect(Collectors.toSet()))
                .positionX(story.getPositionX())
                .positionY(story.getPositionY())
                .build();
    }
}
