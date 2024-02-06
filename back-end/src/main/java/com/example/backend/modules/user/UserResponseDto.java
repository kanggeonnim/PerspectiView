package com.example.backend.modules.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private String userNickname;
    private String userImageUrl;
    private String email;
    private String userPhone;
    private String userInfo;

    public static UserResponseDto of(User user) {
        return UserResponseDto.builder()
                .userNickname(user.getUserNickname())
                .userImageUrl(user.getUserImageUrl())
                .email(user.getEmail())
                .userPhone(user.getUserPhone())
                .userInfo(user.getUserInfo())
                .build();
    }
}
