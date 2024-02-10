package com.example.backend.modules.plot;

import com.example.backend.modules.story.StoryPreviewResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class PlotPreviewResponseDto {
    private Long id;
    private String plotName;
    private String plotColor;

    public static PlotPreviewResponseDto of(Plot plot) {
        return PlotPreviewResponseDto.builder()
                .id(plot.getId())
                .plotName(plot.getName())
                .plotColor(plot.getColor())
                .build();
    }
}
