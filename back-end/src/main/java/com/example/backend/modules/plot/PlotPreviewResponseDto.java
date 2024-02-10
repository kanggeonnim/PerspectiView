package com.example.backend.modules.plot;

import com.example.backend.modules.story.StoryPreviewResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class PlotPreviewResponseDto {
    private String plotName;
    private String plotColor;

    public static PlotPreviewResponseDto of(Plot plot) {
        return PlotPreviewResponseDto.builder()
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .build();
    }
}
