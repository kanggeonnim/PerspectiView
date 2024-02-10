package com.example.backend.modules.plot;

import com.example.backend.modules.story.StoryPreviewResponseDto;
import com.example.backend.modules.story.StoryResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class PlotResponseDto {
    private Long plotId;
    private String plotName;
    private String plotColor;
    private List<StoryPreviewResponseDto> stories;

    public static PlotResponseDto of(Plot plot) {
        return PlotResponseDto.builder()
                .plotId(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .stories(plot.getStories().stream()
                        .map(story -> StoryPreviewResponseDto.of(
                                story,
                                story.getStoryRelations().stream()
                                        .map(storyRelation -> storyRelation.getCharacter())
                                        .collect(Collectors.toSet())
                        )).collect(Collectors.toList()))
                .build();
    }
}
