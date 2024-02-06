package com.example.backend.modules.plot;

import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PlotResponseDto {
    private Long plotId;
    private String plotName;
    private String plotColor;
    private List<Story> storyList;

    public static PlotResponseDto from(Plot plot){
        return PlotResponseDto.builder()
                .plotId(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .storyList(plot.getStories())
                .build();
    }
}
