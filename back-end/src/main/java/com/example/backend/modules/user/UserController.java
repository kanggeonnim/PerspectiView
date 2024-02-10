package com.example.backend.modules.user;

import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final S3Uploader s3Uploader;

    @GetMapping
    public ApiResult<UserResponseDto> getUser(@AuthenticationPrincipal PrincipalDetails principal) {
        User user = userService.getUser(principal.getUsername());
        return ApiResult.OK(UserResponseDto.of(user));
    }


    @DeleteMapping
    public ApiResult<UserResponseDto> deleteUser(@AuthenticationPrincipal PrincipalDetails principal) {
        userService.deleteUser(principal.getUsername());
        return ApiResult.OK(null);
    }

    @PutMapping
    public ApiResult<UserResponseDto> updateUser(@RequestBody @Valid UserRequestDto userRequestDto,
                                                 @RequestPart(required = false) MultipartFile uploadImage,
                                                 @AuthenticationPrincipal PrincipalDetails principal) throws IOException {

        User reqUser = UserRequestDto.from(userRequestDto);

        if (uploadImage != null) {
            String url = s3Uploader.upload(uploadImage).orElseThrow(() -> new IllegalArgumentException());
            reqUser.addImageUrl(url);
        }

        User user = userService.updateUser(principal.getUsername(), reqUser);
        return ApiResult.OK(UserResponseDto.of(user));
    }
}
