package com.example.backend.modules.character;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterResponseDto {
    private Long id;
    private String name;
    private String image;
    private String detail;
    private double positionX;
    private double positionY;

    public static CharacterResponseDto of(Character character) {
        return CharacterResponseDto.builder()
                .id(character.getId())
                .image(character.getCharacterImageUrl())
                .name(character.getCharacterName())
                .detail(character.getCharacterDetail())
                .positionX(character.getPositionX())
                .positionY(character.getPositionY())
                .build();
    }

    @JsonCreator
    public CharacterResponseDto(@JsonProperty("id") Long id,
                                @JsonProperty("name") String name,
                                @JsonProperty("image") String image,
                                @JsonProperty("detail") String detail,
                                @JsonProperty("positionX") double positionX,
                                @JsonProperty("positionY") double positionY) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.detail = detail;
        this.positionX = positionX;
        this.positionY = positionY;
    }
}
