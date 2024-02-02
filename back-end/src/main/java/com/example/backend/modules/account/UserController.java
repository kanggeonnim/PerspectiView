package com.example.backend.modules.account;

import ch.qos.logback.core.model.Model;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@Slf4j
public class UserController {

    private final UserService userService;
    @GetMapping("/")
    public ApiResult<UserResponseDto> user(@AuthenticationPrincipal PrincipalDetails principal) {
        User user = userService.getUser(principal.getUsername());
        return ApiResult.OK(UserResponseDto.of(user));
    }

}
