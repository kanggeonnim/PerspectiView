package com.example.backend.modules.character;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/character")
public class CharacterController {
    private final CharacterService characterService;

    @GetMapping
    public ApiResult<List<CharacterResponseDto>> getCharacters(@PathVariable Long productId, @PathVariable Long teamId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<Character> characters = characterService.getCharacters(productId, teamId, principalDetails.getUser());
        return ApiResult.OK(characters.stream().map(CharacterResponseDto::of)
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> deleteCharacter(@PathVariable Long productId, @PathVariable Long teamId, @AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long characterId) {
        characterService.deleteCharacter(characterId, teamId, principalDetails.getUser());
        return ApiResult.OK(null);
    }

}