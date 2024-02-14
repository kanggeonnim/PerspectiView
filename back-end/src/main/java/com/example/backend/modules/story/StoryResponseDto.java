package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterResponseDto;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingPreviewDto;
import com.example.backend.modules.foreshadowing.ForeShadowingResponseDto;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private List<ForeShadowingPreviewDto> foreShadowings;
    private ContentDto storyContent;
    private int positionX;
    private Double positionY;

    public static StoryResponseDto of(Story story, List<Character> characters, List<ForeShadowing> foreShadowings) {
        return StoryResponseDto.builder()
                .storyId(story.getId())
                .storyTitle(story.getTitle())
                .characters(characters.stream().map(CharacterResponseDto::of).collect(Collectors.toList()))
                .foreShadowings(foreShadowings.stream().map(foreShadowing -> ForeShadowingPreviewDto.of(foreShadowing)).collect(Collectors.toList()))
                .storyContent(ContentDto.of(story.getContent()))
                .positionX(story.getPositionX())
                .positionY(story.getPositionY())
                .build();
    }

    public StoryResponseDto updateStoryResponseDto(Story story, List<CharacterResponseDto> characters, List<ForeShadowingPreviewDto> foreShadowings) {
        this.storyId = story.getId();
        this.storyTitle = story.getTitle();
        this.characters = characters;
        this.foreShadowings = foreShadowings;
        this.storyContent = ContentDto.of(story.getContent());
        this.positionX = story.getPositionX();
        this.positionY = story.getPositionY();

        return this;
    }

    @JsonCreator
    public StoryResponseDto(@JsonProperty("storyId") Long storyId,
                            @JsonProperty("storyTitle") String storyTitle,
                            @JsonProperty("characters") List<CharacterResponseDto> characters,
                            @JsonProperty("foreShadowings") List<ForeShadowingPreviewDto> foreShadowings,
                            @JsonProperty("storyContent") ContentDto storyContent,
                            @JsonProperty("positionX") int positionX,
                            @JsonProperty("positionY") Double positionY) {
        this.storyId = storyId;
        this.storyTitle = storyTitle;
        this.characters = characters;
        this.foreShadowings = foreShadowings;
        this.storyContent = storyContent;
        this.positionX = positionX;
        this.positionY = positionY;
    }
}
