package com.example.backend.modules.plot;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlotNameRequestDto {
    @NotNull
    private String plotName;

    public static Plot from(PlotNameRequestDto plotRequestDto) {
        return Plot.builder().name(plotRequestDto.getPlotName()).build();
    }
}
