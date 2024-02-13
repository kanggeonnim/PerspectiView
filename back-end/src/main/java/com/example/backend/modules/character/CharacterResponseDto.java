package com.example.backend.modules.character;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonCreator
    public CharacterResponseDto(@JsonProperty("id") Long id,
                                @JsonProperty("name") String name,
                                @JsonProperty("image") String image,
                                @JsonProperty("detail") String detail,
                                @JsonProperty("positionX") double positionX,
                                @JsonProperty("positionY") double positionY) {
        this.characterId = id;
        this.characterName = name;
        this.characterImage = image;
        this.characterDetail = detail;
        this.characterPositionX = positionX;
        this.characterPositionY = positionY;
    }
}
