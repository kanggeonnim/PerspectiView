package com.example.backend.modules.character;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterDto {
    private Long id;
    private String name;
    private String image;
    private String detail;
    private double positionX;
    private double positionY;

    public static CharacterDto of(Character character) {
        return CharacterDto.builder()
                .id(character.getId())
                .image(character.getCharacterImageUrl())
                .name(character.getCharacterName())
                .detail(character.getCharacterDetail())
                .positionX(character.getPositionX())
                .positionY(character.getPositionY())
                .build();
    }
}