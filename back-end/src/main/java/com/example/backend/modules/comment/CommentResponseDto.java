package com.example.backend.modules.comment;

import com.example.backend.modules.account.User;
import com.example.backend.modules.story.Story;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    private Long commentId;
    private String commentContent;
    private Long storyId;
    private Long userId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public static CommentResponseDto of(Comment comment){
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .commentContent(comment.getCommentContent())
                .storyId(comment.getStory().getId())
                .userId(comment.getUser().getId())
                .createdDate(comment.getCreatedDate())
                .modifiedDate(comment.getModifiedDate())
                .build();
    }
}
