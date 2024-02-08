package com.example.backend.modules.story;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.character.CharacterRequestDto;
import com.example.backend.modules.character.CharacterResponseDto;
import com.example.backend.modules.foreshadowing.ForeShadowingRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/plot/{plotId}/story")
public class StoryController {
    private final StoryService storyService;

    @PostMapping
    public ApiResult<StoryResponseDto> createStory(@RequestBody StoryRequestDto storyRequestDto) {
        //story 등록
        Story story = storyService.createStory(
                StoryRequestDto.of(storyRequestDto),
                storyRequestDto.getStoryContent(),
                storyRequestDto.getCharacters().stream().map(CharacterRequestDto::from).collect(Collectors.toList()));

        StoryResponseDto storyResponseDto = storyService.findByStoryId(story.getId());
        return ApiResult.OK(storyResponseDto);
    }

    @PatchMapping("/{storyId}")
    public ApiResult<StoryResponseDto> updateStory(@RequestBody StoryRequestDto storyRequestDto) {
        Story story = storyService.updateStory(
                StoryRequestDto.of(storyRequestDto),
                storyRequestDto.getCharacters().stream().map(CharacterRequestDto::from).collect(Collectors.toList()),
                storyRequestDto.getForeShadowings().stream().map(ForeShadowingRequestDto::from).collect(Collectors.toList()));

        StoryResponseDto storyResponseDto = storyService.findByStoryId(story.getId());
        return ApiResult.OK(storyResponseDto);
    }

    @DeleteMapping("/{storyId}")
    public ApiResult<StoryResponseDto> deleteStory(@PathVariable("storyId") Long storyId) {
        storyService.deleteStory(storyId);
        return ApiResult.OK(null);
    }

    @GetMapping("/{storyId}")
    public ApiResult<StoryResponseDto> getStory(@PathVariable("storyId") Long storyId) {
        return ApiResult.OK(storyService.findByStoryId(storyId));
    }

    @PostMapping("/{storyId}/vertical")
    public ApiResult<StoryResponseDto> updatePositionY(@PathVariable("storyId") Long storyId,
                                                       @RequestBody StoryRequestDto storyRequestDto) {
        storyService.updatePositionY(StoryRequestDto.of(storyRequestDto));
        StoryResponseDto storyResponseDto = storyService.findByStoryId(storyId);
        return ApiResult.OK(storyResponseDto);
    }

}
