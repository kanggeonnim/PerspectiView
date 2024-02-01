package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlotRequestDto {
    private String plotName;
    private String plotColor;

    public Plot of(PlotRequestDto plotRequestDto){
        return Plot.builder().name(plotRequestDto.plotName)
                .color(plotRequestDto.plotColor).build();
    }
}
