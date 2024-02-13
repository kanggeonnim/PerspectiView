package com.example.backend.modules.character;

import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/character")
@Slf4j
public class CharacterController {
    private final CharacterService characterService;
    private final S3Uploader s3Uploader;

    @GetMapping
    public ApiResult<List<CharacterResponseDto>> getCharacters(@PathVariable Long productId) {
        List<Character> characters = characterService.getCharacters(productId);
        return ApiResult.OK(characters.stream().map(CharacterResponseDto::of)
                .collect(Collectors.toList()));
    }

    @GetMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> getCharacter(@PathVariable Long characterId) {
        Character character = characterService.getCharacter(characterId);
        return ApiResult.OK(CharacterResponseDto.of(character));
    }

    @DeleteMapping("/{characterId}")
    public ApiResult<CharacterResponseDto> deleteCharacter(@PathVariable Long characterId) {
        characterService.deleteCharacter(characterId);
        return ApiResult.OK(null);
    }

    @PutMapping(value = "/{characterId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResult<CharacterResponseDto> updateCharacter(@RequestPart(value = "uploadImage", required = false) MultipartFile uploadImage,
                                                           @PathVariable Long characterId, @RequestPart @Valid CharacterRequestDto characterRequestDto) throws IOException {

        Character reqCharacter = CharacterRequestDto.from(characterRequestDto);

        if (uploadImage != null) {
            String url = s3Uploader.upload(uploadImage).orElseThrow(() -> new IllegalArgumentException());
            reqCharacter.addImageUrl(url);
        }
        Character character = characterService.updateCharacter(reqCharacter, characterId);
        return ApiResult.OK(CharacterResponseDto.of(character));
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResult<CharacterResponseDto> createCharacter(@PathVariable Long productId,
                                                           @RequestPart(required = false) MultipartFile uploadImage,
                                                           @RequestPart @Valid CharacterRequestDto characterRequestDto) throws IOException {
        log.info("========create character contoller ======");
        Character reqCharacter = CharacterRequestDto.from(characterRequestDto);

        if (uploadImage != null) {
            String url = s3Uploader.upload(uploadImage).orElseThrow(() -> new IllegalArgumentException());
            reqCharacter.addImageUrl(url);
        }

        Character character = characterService.createCharacter(reqCharacter, productId);
        return ApiResult.OK(CharacterResponseDto.of(character));
    }
}