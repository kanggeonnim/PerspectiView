package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterResponseDto;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class StoryResponseDto {
    private Long storyId;
    private String storyTitle;
    private List<CharacterResponseDto> characters;
    private List<ForeShadowingResponseDto> foreShadowings;
    private Content content;
    private int positionX;
    private Double positionY;

    public static StoryResponseDto of(Story story, List<Character> characters, List<ForeShadowing> foreShadowings) {
        return StoryResponseDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .characters(characters.stream().map(CharacterResponseDto::of).collect(Collectors.toList()))
                .foreShadowings(foreShadowings.stream().map(foreShadowing ->
                        ForeShadowingResponseDto.of(
                                foreShadowing,
                                null,
                                "null?"
                        )).collect(Collectors.toList()))
                .content(story.getContent())
                .positionX(story.getPositionX())
                .positionY(story.getPositionY())
                .build();
    }
}
