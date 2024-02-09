package com.example.backend.modules.plot;

import com.example.backend.modules.story.StoryResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class PlotResponseWithStoriesDto {
    private Long plotId;
    private String plotName;
    private String plotColor;
    private List<StoryResponseDto> storyList;

    public static PlotResponseWithStoriesDto of(Plot plot) {
        return PlotResponseWithStoriesDto.builder()
                .plotId(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .storyList(plot.getStories().stream()
                        .map(story -> StoryResponseDto.of(story, null, null))
                        .collect(Collectors.toList()))
                .build();
    }
}
