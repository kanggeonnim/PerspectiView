package com.example.backend.modules.story;

import com.example.backend.modules.foreshadowing.ForeShadowing;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoryForeShadowingRepository extends JpaRepository<StoryForeShadowing, Long> {
    @EntityGraph(attributePaths = {"story"})
    List<StoryForeShadowing> findWithStoryByForeShadowing(ForeShadowing foreShadowing);

    @EntityGraph(attributePaths = {"foreShadowing"})
    Optional<StoryForeShadowing> findWithFshadowById(Long id);

    StoryForeShadowing findByForeShadowingAndStory(ForeShadowing foreShadowing, Story story);

    @EntityGraph(attributePaths = {"foreShadowing"})
    List<StoryForeShadowing> findByStory(Story story);
}
