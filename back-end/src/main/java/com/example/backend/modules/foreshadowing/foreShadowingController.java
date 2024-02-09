package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/foreshadowing")
public class foreShadowingController {
    private final ForeShadowingService foreShadowingService;


    @PostMapping("/")
    public ApiResult<ForeShadowingResponseDto> createForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto,
                                                                   @PathVariable("productId") Long productId) {
        ForeShadowing foreShadowing = foreShadowingService.createForeShadowing(productId, foreShadowingRequestDto.from(foreShadowingRequestDto));
        List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(foreShadowing);
        return ApiResult.OK(ForeShadowingResponseDto.of(foreShadowing, storyids));
    }

    @PatchMapping("/{foreshadowingId}")
    public ApiResult<ForeShadowingResponseDto> updateForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto,
                                                                   @PathVariable("productId") Long productId) {
        ForeShadowing foreShadowing = foreShadowingService.updateForeShadowing(productId, ForeShadowingRequestDto.from(foreShadowingRequestDto));
        List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(foreShadowing);
        return ApiResult.OK(ForeShadowingResponseDto.of(foreShadowing, storyids));
    }

    @DeleteMapping("/{foreshadowingId}")
    public ApiResult<ForeShadowingResponseDto> deleteForeShadowing(@PathVariable("foreshadowingId") Long foreShadowingId,
                                                                   @PathVariable("productId") Long productId) {
        foreShadowingService.deleteForeShadowing(productId, foreShadowingId);
        return ApiResult.OK(null);
    }

    @GetMapping
    public ApiResult<Map<Long, ForeShadowingResponseDto>> findAllFshadow(@PathVariable("productId") Long productId) {
        List<ForeShadowing> foreShadowings = foreShadowingService.findByProductId(productId);
        Map<Long, ForeShadowingResponseDto> result = new HashMap<>();
        for (ForeShadowing fs : foreShadowings) {
            List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(fs);
            result.put(fs.getId(), ForeShadowingResponseDto.of(fs, storyids));
        }
        return ApiResult.OK(result);
    }

}
