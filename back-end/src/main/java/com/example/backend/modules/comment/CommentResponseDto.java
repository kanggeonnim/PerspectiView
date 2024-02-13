package com.example.backend.modules.comment;


import com.example.backend.modules.user.UserCommentResponseDto;
import lombok.Builder;
import lombok.Data;


import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    private Long commentId;
    private String commentContent;
    private Long storyId;
    private UserCommentResponseDto user;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static CommentResponseDto of(Comment comment){
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .commentContent(comment.getCommentContent())
                .storyId(comment.getStory().getId())
                .user(UserCommentResponseDto.from(comment.getUser()))
                .createdDate(comment.getCreatedDate())
                .modifiedDate(comment.getModifiedDate())
                .build();
    }
}
