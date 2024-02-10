package com.example.backend.modules.plot;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlotNameRequestDto {
    @NotNull
    private String plotName;

    public static Plot from(PlotNameRequestDto plotRequestDto) {
        return Plot.builder().name(plotRequestDto.getPlotName()).build();
    }
}
