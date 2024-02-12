package com.example.backend.modules.character;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterRequestDto {
    private Long id;
    @NotNull
    private String name;

    private String image;

    private String detail;

    private double positionX;

    private double positionY;

    public static Character from(CharacterRequestDto characterRequestDto){
        return Character.builder()
                .id(characterRequestDto.getId())
                .characterImageUrl(characterRequestDto.getImage())
                .characterName(characterRequestDto.getName())
                .characterDetail(characterRequestDto.getDetail())
                .positionX(characterRequestDto.getPositionX())
                .positionY(characterRequestDto.getPositionY())
                .build();
    }
}
