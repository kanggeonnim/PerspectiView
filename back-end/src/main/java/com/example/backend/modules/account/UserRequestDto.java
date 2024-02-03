package com.example.backend.modules.account;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRequestDto {
    private String nickname;

    private String image;

    private String email;

    private String userPhone;

    private String userInfo;

    public static User from(UserRequestDto userRequestDto){
        return User.requestBuilder()
                .userNickname(userRequestDto.getNickname())
                .image(userRequestDto.getImage())
                .email(userRequestDto.getEmail())
                .userPhone(userRequestDto.getUserPhone())
                .userInfo(userRequestDto.getUserInfo())
                .build();
    }

}
