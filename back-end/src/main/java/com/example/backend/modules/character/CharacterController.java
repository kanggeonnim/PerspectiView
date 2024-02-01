package com.example.backend.modules.character;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
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

    @GetMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> getCharacter(@PathVariable Long productId, @PathVariable Long teamId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long characterId){
        Character character = characterService.getCharacter(characterId, teamId, principalDetails.getUser());
        return ApiResult.OK(CharacterResponseDto.of(character));
    }

    @DeleteMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> deleteCharacter(@PathVariable Long productId, @PathVariable Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails,
                                                           @PathVariable Long characterId) {
        characterService.deleteCharacter(characterId, teamId, principalDetails.getUser());
        return ApiResult.OK(null);
    }

    @PatchMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> updateCharacter(@PathVariable Long productId, @PathVariable Long teamId, @AuthenticationPrincipal PrincipalDetails principalDetails,
                                                           @PathVariable Long characterId, @RequestBody @Valid CharacterRequestDto characterRequestDto){
        Character character = characterService.updateCharacter(CharacterRequestDto.from(characterRequestDto), teamId, principalDetails.getUser());
        return ApiResult.OK(CharacterResponseDto.of(character));
    }

    @PostMapping
    public ApiResult<CharacterResponseDto> createCharacter(@PathVariable Long productId, @PathVariable Long teamId,
                                                           @RequestBody @Valid CharacterRequestDto characterRequestDto,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails){
        Character character = characterService.createCharacter(CharacterRequestDto.from(characterRequestDto), teamId, principalDetails.getUser());
        return ApiResult.OK(CharacterResponseDto.of(character));
    }
}