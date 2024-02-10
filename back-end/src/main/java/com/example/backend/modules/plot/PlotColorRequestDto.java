package com.example.backend.modules.plot;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlotColorRequestDto {
    @NotNull
    private String plotName;
    @NotNull
    private String plotColor;

    public static Plot from(PlotColorRequestDto plotRequestDto) {
        return Plot.builder().name(plotRequestDto.getPlotName())
                .color(plotRequestDto.getPlotColor()).build();
    }
}
