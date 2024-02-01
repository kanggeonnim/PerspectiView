package com.example.backend.modules.plot;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/plot")
public class PlotController {
    private final PlotService plotService;
    private final TeamService teamService;
    private final ProductService productService;

    @PostMapping("/")
    public ApiResult<Plot> createPlot(@RequestBody @Valid PlotRequestDto plotRequestDto,
                                      @PathVariable("teamId") Long teamId,
                                      @PathVariable("productId") Long productId) {
        Plot plot = null;
        return ApiResult.OK(plot);
    }

}
