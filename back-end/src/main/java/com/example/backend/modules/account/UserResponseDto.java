package com.example.backend.modules.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private String userNickname;
    private String userImage;
    private String email;
    private String userPhone;
    private String userInfo;

    public static UserResponseDto of(User user){
        return UserResponseDto.builder()
                .userNickname(user.getUserNickname())
                .userImage(user.getUserImage())
                .email(user.getEmail())
                .userPhone(user.getUserPhone())
                .userInfo(user.getUserInfo())
                .build();
    }
}
