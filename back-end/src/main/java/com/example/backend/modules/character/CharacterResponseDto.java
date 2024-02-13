package com.example.backend.modules.character;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterResponseDto {
    private Long characterId;
    private String characterName;
    private String characterImage;
    private String characterDetail;
    private double characterPositionX;
    private double characterPositionY;

    public static CharacterResponseDto of(Character character) {
        return CharacterResponseDto.builder()
                .characterId(character.getId())
                .characterImage(character.getCharacterImageUrl())
                .characterName(character.getCharacterName())
                .characterDetail(character.getCharacterDetail())
                .characterPositionX(character.getPositionX())
                .characterPositionY(character.getPositionY())
                .build();
    }
}
