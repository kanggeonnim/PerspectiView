package com.example.backend.modules.user;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public ApiResult<UserResponseDto> getUser(@AuthenticationPrincipal PrincipalDetails principal) {
        User user = userService.getUser(principal.getUsername());
        return ApiResult.OK(UserResponseDto.of(user));
    }


    @DeleteMapping
    public ApiResult<UserResponseDto> deleteUser(@AuthenticationPrincipal PrincipalDetails principal) {
        userService.deleteUser(principal.getUsername());
        return ApiResult.OK(null);
    }

    @PatchMapping
    public ApiResult<UserResponseDto> updateUser(@AuthenticationPrincipal PrincipalDetails principal,
                                                 @RequestBody @Valid UserRequestDto userRequestDto) {
        User user = userService.updateUser(principal.getUsername(), UserRequestDto.from(userRequestDto));
        return ApiResult.OK(UserResponseDto.of(user));
    }
}
