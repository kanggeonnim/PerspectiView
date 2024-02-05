package com.example.backend.modules.plot;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.story.Story;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/plot")
public class PlotController {
    private final PlotService plotService;
    private final TeamService teamService;
    private final ProductService productService;

    /**
     * 작품으로 플롯 조회
     * @param teamId
     * @param productId
     * @param principalDetails
     * @return
     */
    @GetMapping
    public ApiResult<List<PlotResponseDto>> findByProduct(@PathVariable("teamId") Long teamId,
                                                          @PathVariable("productId") Long productId,
                                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<Plot> plots = plotService.findByProductId(principalDetails.getUser(), teamId, productId);
        //plot List 정렬
        plots.sort(Comparator.comparing(Plot::getId));
        //story정렬
        for(Plot p:plots){
            if(p!=null){
                p.getStories().sort(Comparator.comparing(Story::getPositionX));
            }
        }
        return ApiResult.OK(plots.stream()
                .map(PlotResponseDto::from)
                .collect(Collectors.toList()));
    }

    @PostMapping
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
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Plot plot = plotService.updatePlot(principalDetails.getUser(), teamId, productId, PlotRequestDto.of(plotRequestDto));
        return ApiResult.OK(PlotResponseDto.from(plot));
    }

    @DeleteMapping("/{plotId}")
    public ApiResult<PlotResponseDto> deletePlot(@PathVariable("plotId") Long plotId,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails) {
        plotService.deletePlot(principalDetails.getUser(), teamId, productId, plotId);
        return ApiResult.OK(null);
    }


}
