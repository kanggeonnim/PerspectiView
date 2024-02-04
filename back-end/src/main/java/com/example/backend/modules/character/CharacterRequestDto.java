package com.example.backend.modules.character;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterRequestDto {
    @NotNull
    private String name;

    private String detail;

    private double positionX;

    private double positionY;

    public static Character from(CharacterRequestDto characterRequestDto){
        return Character.positionBuilder()
                .characterName(characterRequestDto.getName())
                .characterDetail(characterRequestDto.getDetail())
                .positionX(characterRequestDto.getPositionX())
                .positionY(characterRequestDto.getPositionY())
                .build();
    }
}
