package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.api.ApiResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/foreshadowing")
@Slf4j
public class foreShadowingController {
    private final ForeShadowingService foreShadowingService;


    @PostMapping
    public ApiResult<ForeShadowingResponseDto> createForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto,
                                                                   @PathVariable("productId") Long productId) {
        log.info("========== create foreShadowing ============ ");
        ForeShadowing foreShadowing = foreShadowingService.createForeShadowing(foreShadowingRequestDto.from(foreShadowingRequestDto),productId);
        List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(foreShadowing);
        String columnId = "column-1";
        return ApiResult.OK(ForeShadowingResponseDto.of(foreShadowing, storyids, columnId));
    }

    @PutMapping("/{foreshadowingId}")
    public ApiResult<ForeShadowingResponseDto> updateForeShadowing(@RequestBody @Valid ForeShadowingRequestDto foreShadowingRequestDto) {
        ForeShadowing foreShadowing = foreShadowingService.updateForeShadowing( ForeShadowingRequestDto.from(foreShadowingRequestDto));
        List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(foreShadowing);
        String columnId = "column-1";
        if(storyids.isEmpty()&&foreShadowing.getFShadowClose()==null){
            columnId = "column-1";
        }else if(!storyids.isEmpty()&&foreShadowing.getFShadowClose()==null){
            columnId = "column-2";
        }else if(!storyids.isEmpty()&&foreShadowing.getFShadowClose()!=null){
            columnId = "column-3";
        }
        return ApiResult.OK(ForeShadowingResponseDto.of(foreShadowing, storyids,columnId));
    }

    @DeleteMapping("/{foreshadowingId}")
    public ApiResult<ForeShadowingResponseDto> deleteForeShadowing(@PathVariable("foreshadowingId") Long foreShadowingId) {
        foreShadowingService.deleteForeShadowing(foreShadowingId);
        return ApiResult.OK(null);
    }

    @GetMapping
    public ApiResult<Map<Long, ForeShadowingResponseDto>> findAllFshadow(@PathVariable("productId") Long productId) {
        List<ForeShadowing> foreShadowings = foreShadowingService.findByProductId(productId);
        Map<Long, ForeShadowingResponseDto> result = new HashMap<>();
        String columnId = "column-1";
        for (ForeShadowing fs : foreShadowings) {
            List<FshadowStoryIdDto> storyids = foreShadowingService.findStories(fs);
            if (storyids.isEmpty() && fs.getFShadowClose() == null) {
                columnId = "column-1";
            } else if (!storyids.isEmpty() && fs.getFShadowClose() == null) {
                columnId = "column-2";
            } else if (!storyids.isEmpty() && fs.getFShadowClose() != null) {
                columnId = "column-3";
            }
            result.put(fs.getId(), ForeShadowingResponseDto.of(fs, storyids,columnId));
        }
        return ApiResult.OK(result);
    }

}
