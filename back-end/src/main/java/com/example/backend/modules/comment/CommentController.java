package com.example.backend.modules.comment;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team/{teamId}/product/{productId}/plot/{plotId}/story/{storyId}/comment")
public class CommentController {

    private final CommentService commentService;

    /**
     * 댓글 생성
     */
    @PostMapping
    public ApiResult<CommentResponseDto> createComment(@RequestBody @Valid CommentRequestDto commentRequestDto,
                                            @PathVariable("storyId") Long storyId,
                                            @AuthenticationPrincipal PrincipalDetails principalDetails){
        Comment madeComment=commentService.createComment(principalDetails.getUser(),storyId,CommentRequestDto.from(commentRequestDto));
        return ApiResult.OK(CommentResponseDto.of(madeComment));
    }

    /**
     * 댓글 스토리로 조회
     */
    @GetMapping
    public ApiResult<List<CommentResponseDto>> findByStory(@PathVariable("storyId") Long storyId,
                                                  @AuthenticationPrincipal PrincipalDetails principalDetails){
        List<Comment> comments = commentService.findByStory(storyId);
        return ApiResult.OK(comments.stream()
                .map(CommentResponseDto::of)
                .collect(Collectors.toList()));
    }

    /**
     * 댓글 수정
     */
    @PutMapping("/{commentId}")
    public ApiResult<CommentResponseDto> updateComment(@RequestBody @Valid CommentRequestDto commentRequestDto,
                                 @PathVariable("commentId") Long commentId){
        Comment comment = commentService.updateComment(commentId, CommentRequestDto.from(commentRequestDto));
        return ApiResult.OK(CommentResponseDto.of(comment));
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{commentId}")
    public ApiResult<CommentResponseDto> deleteComment(@PathVariable("commentId") Long commentId){
        commentService.deleteComment(commentId);
        return ApiResult.OK(null);
    }
}
