package com.example.backend.modules.comment;

import com.example.backend.modules.story.Story;
import com.example.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String commentContent;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    @ManyToOne
    @JoinColumn(name = "story_id")
    private Story story;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Comment(String commentContent, Story story, User user) {
        this.commentContent = commentContent;
        this.story = story;
        this.user = user;
    }

    //-----------수정 메서드-----------------//
    public void updateComment(String commentContent) {
        this.commentContent = commentContent;
    }
}
