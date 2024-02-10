package com.example.backend.modules.plot;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlotColorRequestDto {

    @NotNull
    private String plotColor;

    public static Plot from(PlotColorRequestDto plotRequestDto) {
        return Plot.builder().color(plotRequestDto.getPlotColor()).build();
    }
}
