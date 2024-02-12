package com.example.backend.modules.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseWithTeamIdDto {
    private String nickname;
    private String image;
    private Long personalTeamId;
    private String email;
    private String phone;
    private String info;

    public static UserResponseWithTeamIdDto of(User user, Long personalTeamId) {
        return UserResponseWithTeamIdDto.builder()
                .nickname(user.getUserNickname())
                .image(user.getUserImageUrl())
                .personalTeamId(personalTeamId)
                .email(user.getEmail())
                .phone(user.getUserPhone())
                .info(user.getUserInfo())
                .build();
    }
}
