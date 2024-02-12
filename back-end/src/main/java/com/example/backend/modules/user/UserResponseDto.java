package com.example.backend.modules.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private String nickname;
    private String image;
    private String email;
    private String phone;
    private String info;

    public static UserResponseDto of(User user) {
        return UserResponseDto.builder()
                .nickname(user.getUserNickname())
                .image(user.getUserImageUrl())
                .email(user.getEmail())
                .phone(user.getUserPhone())
                .info(user.getUserInfo())
                .build();
    }
}
