package com.example.backend.modules.character;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CharacPostRequestDto {
    private String CharacterName;
    private String CharacterDetail;

    public static Character from (CharacPostRequestDto characPostRequestDto){
        return Character.builder()
                .characterName(characPostRequestDto.getCharacterName())
                .characterDetail(characPostRequestDto.getCharacterDetail())
                .build();
    }


}
