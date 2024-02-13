package com.example.backend.modules.character;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacterIdOnlyResponseDto {
    private Long characterId;

    public static CharacterIdOnlyResponseDto of(Character character){
        return CharacterIdOnlyResponseDto.builder()
                .characterId(character.getId())
                .build();
    }
}
