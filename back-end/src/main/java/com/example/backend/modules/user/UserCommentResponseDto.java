package com.example.backend.modules.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCommentResponseDto {
    private String userNickname;
    private String userEmail;
    private String userImage;

    public static UserCommentResponseDto from(User user){
        return UserCommentResponseDto.builder()
                .userNickname(user.getUserNickname())
                .userEmail(user.getEmail())
                .userImage(user.getUserImageUrl())
                .build();
    }

}
