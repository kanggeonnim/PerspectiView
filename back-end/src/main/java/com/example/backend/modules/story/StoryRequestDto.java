package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.plot.Plot;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StoryRequestDto {
    private Plot plot;
    private String storyTitle;
    private String storyContent;
    private List<Character> characters;
    private int positionX;
    private Double positionY;

    public static Story of(StoryRequestDto storyRequestDto){
        return Story.builder()
                .title(storyRequestDto.getStoryTitle())
                .plot(storyRequestDto.getPlot())
                .positionX(storyRequestDto.getPositionX())
                .positionY(storyRequestDto.getPositionY())
                .build();
    }
}
