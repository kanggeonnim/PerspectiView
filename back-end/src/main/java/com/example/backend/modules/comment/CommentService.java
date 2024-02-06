package com.example.backend.modules.comment;


import com.example.backend.modules.story.Story;
import com.example.backend.modules.story.StoryRepository;
import com.example.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final StoryRepository storyRepository;

    /**
     * 댓글 생성
     */
    public Comment createComment(User user, Long storyId, Comment comment){
        //story 정보
        Story story = storyRepository.findById(storyId).orElseThrow(()-> new RuntimeException());

        Comment createComment = Comment.builder()
                .commentContent(comment.getCommentContent())
                .story(story)
                .user(user)
                .build();

        //save
        Comment newComment = commentRepository.save(comment);

        return newComment;
    }

    /**
     * 댓글 스토리로 조회
     */
    public List<Comment> findByStory(Long storyId){
        Story story = storyRepository.findById(storyId).orElseThrow(()->new RuntimeException());
        return commentRepository.findByStory(story);
    }

    /**
     * 댓글 수정
     */
    public Comment updateComment(Long commentId, Comment comment){
        Comment updateComment = commentRepository.findById(commentId).orElseThrow(()->new RuntimeException());
        updateComment.updateComment(comment.getCommentContent());
        return updateComment;
    }

    /**
     * 댓글 삭제
     */
    public void deleteComment(Long commentId){
        commentRepository.deleteById(commentId);
    }

}
