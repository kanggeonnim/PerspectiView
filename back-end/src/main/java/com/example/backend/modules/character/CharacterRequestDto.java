package com.example.backend.modules.character;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class CharacterRequestDto {
    private Long id;
    @NotNull
    private String name;

    private String detail;

    private double positionX;

    private double positionY;

    public static Character from(CharacterRequestDto characterRequestDto){
        return Character.builder()
                .id(characterRequestDto.getId())
                .characterName(characterRequestDto.getName())
                .characterDetail(characterRequestDto.getDetail())
                .positionX(characterRequestDto.getPositionX())
                .positionY(characterRequestDto.getPositionY())
                .build();
    }
}
