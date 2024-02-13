package com.example.backend.modules.comment;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class CommentRequestDto {

    @Length(max = 300)
    @NotNull
    private String commentContent;

    public static Comment from(CommentRequestDto commentRequestDto){
        return Comment.builder()
                .commentContent(commentRequestDto.getCommentContent())
                .build();
    }

    @JsonCreator
    public CommentRequestDto(@JsonProperty("commentContent") String commentContent){
        this.commentContent = commentContent;
    }
}
