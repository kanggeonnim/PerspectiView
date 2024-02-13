package com.example.backend.modules.comment;


import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.story.Story;
import com.example.backend.modules.story.StoryRepository;
import com.example.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final StoryRepository storyRepository;

    /**
     * 댓글 생성
     */
    @Transactional
    public Comment createComment(User user, Long storyId, Comment comment){
        //story 정보
        Story story = storyRepository.findById(storyId).orElseThrow(()-> new NotFoundException());

        //만들 때 현재 날짜 시간 전달
        Comment createComment = Comment.builder()
                .commentContent(comment.getCommentContent())
                .story(story)
                .user(user)
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .build();

        //save
        Comment newComment = commentRepository.save(createComment);

        return newComment;
    }

    /**
     * 댓글 스토리로 조회
     */
    public List<Comment> findByStory(Long storyId){
        Story story = storyRepository.findById(storyId).orElseThrow(()->new NotFoundException());
        return commentRepository.findWithUserByStory(story);
    }

    /**
     * 댓글 수정
     */
    @Transactional
    public Comment updateComment(Long commentId, Comment comment){
        Comment updateComment = commentRepository.findById(commentId).orElseThrow(()->new NotFoundException());
        updateComment.updateComment(comment.getCommentContent());
        return updateComment;
    }

    /**
     * 댓글 삭제
     */
    @Transactional
    public void deleteComment(Long commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(()->new NotFoundException());
        commentRepository.deleteById(comment.getId());
    }

}
