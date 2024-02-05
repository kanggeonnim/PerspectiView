package com.example.backend.modules.foreshadowing;

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
@RequestMapping("/team/{teamId}/product/{productId}/foreShadowing")
public class foreShadowingController {
    private final ForeShadowingService foreShadowingService;
    private final TeamService teamService;
    private final ProductService productService;


    @PostMapping("/")
    public ApiResult<ForeShadowingResponseDto> createForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails) {
        ForeShadowing foreShadowing = foreShadowingService.createForeShadowing(principalDetails.getUser(), teamId, productId, foreShadowingRequestDto.of(foreShadowingRequestDto));
        return ApiResult.OK(ForeShadowingResponseDto.from(foreShadowing));
    }

    @PatchMapping("/{foreShadowingId}")
    public ApiResult<ForeShadowingResponseDto> updateForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){
        ForeShadowing foreShadowing = foreShadowingService.updateForeShadowing(principalDetails.getUser(), teamId, productId, ForeShadowingRequestDto.of(foreShadowingRequestDto));
        return ApiResult.OK(ForeShadowingResponseDto.from(foreShadowing));
    }

    @DeleteMapping("/{foreShadowingId}")
    public ApiResult<ForeShadowingResponseDto> deleteForeShadowing(@PathVariable("foreShadowingId") Long foreShadowingId,
                                                 @PathVariable("teamId") Long teamId,
                                                 @PathVariable("productId") Long productId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){
        foreShadowingService.deleteForeShadowing(principalDetails.getUser(),teamId,productId,foreShadowingId);
        return ApiResult.OK(null);
    }


}
