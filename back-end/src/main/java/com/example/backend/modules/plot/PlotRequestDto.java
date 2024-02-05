package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlotRequestDto {
    @NotNull
    private String plotName;
    @NotNull
    private String plotColor;

    public static Plot of(PlotRequestDto plotRequestDto){
        return Plot.builder().name(plotRequestDto.getPlotName())
                .color(plotRequestDto.getPlotColor()).build();
    }
}
