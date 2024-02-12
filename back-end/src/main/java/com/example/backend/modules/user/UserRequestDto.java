package com.example.backend.modules.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRequestDto {
    private String nickname;

    private String email;

    private String userPhone;

    private String userInfo;

    public static User from(UserRequestDto userRequestDto) {
        return User.builder()
                .userNickname(userRequestDto.getNickname())
                .email(userRequestDto.getEmail())
                .userPhone(userRequestDto.getUserPhone())
                .userInfo(userRequestDto.getUserInfo())
                .build();
    }

}
