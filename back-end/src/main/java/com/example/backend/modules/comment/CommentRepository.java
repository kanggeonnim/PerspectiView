package com.example.backend.modules.comment;

import com.example.backend.modules.story.Story;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    @EntityGraph(attributePaths = {"user"})
    List<Comment> findWithUserByStory(Story story);
}
