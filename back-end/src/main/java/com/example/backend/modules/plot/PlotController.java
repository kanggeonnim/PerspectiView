package com.example.backend.modules.plot;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/plot")
public class PlotController {
    private final PlotService plotService;
    private final TeamService teamService;
    private final ProductService productService;

    @PostMapping("/")
    public ApiResult<PlotResponseDto> createPlot(@RequestBody @Valid PlotRequestDto plotRequestDto,
                                      @PathVariable("teamId") Long teamId,
                                      @PathVariable("productId") Long productId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Plot plot = plotService.createPlot(principalDetails.getUser(), teamId, productId, PlotRequestDto.of(plotRequestDto));
        return ApiResult.OK(PlotResponseDto.from(plot));
    }

    @PatchMapping("/{plotId}")
    public ApiResult<PlotResponseDto> updatePlot(@RequestBody @Valid PlotRequestDto plotRequestDto,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){
        Plot plot = plotService.updatePlot(principalDetails.getUser(), teamId, productId, PlotRequestDto.of(plotRequestDto));
        return ApiResult.OK(PlotResponseDto.from(plot));
    }

    @DeleteMapping("/{plotId}")
    public ApiResult<PlotResponseDto> deletePlot(@PathVariable("plotId") Long plotId,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){
        plotService.deletePlot(principalDetails.getUser(),teamId,productId,plotId);
        return ApiResult.OK(null);
    }


}
