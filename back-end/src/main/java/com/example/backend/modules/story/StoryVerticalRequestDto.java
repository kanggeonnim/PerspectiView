package com.example.backend.modules.story;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoryVerticalRequestDto {
    private Long storyId;
    @NotNull
    private Double positionY;
}
