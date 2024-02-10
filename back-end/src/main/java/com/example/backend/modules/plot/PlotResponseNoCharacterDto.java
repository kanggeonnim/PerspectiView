package com.example.backend.modules.plot;

import com.example.backend.modules.story.StoryPreviewResponseDto;
import com.example.backend.modules.story.StoryResponseNoCharacterDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class PlotResponseNoCharacterDto {
    private Long plotId;
    private String plotName;
    private String plotColor;
    private List<StoryResponseNoCharacterDto> stories;

    public static PlotResponseNoCharacterDto of(Plot plot){
        return PlotResponseNoCharacterDto.builder()
                .plotId(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .stories(plot.getStories().stream().map(StoryResponseNoCharacterDto::of).collect(Collectors.toList()))
                .build();
    }
}
