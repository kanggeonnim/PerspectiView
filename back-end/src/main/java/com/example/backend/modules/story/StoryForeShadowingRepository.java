package com.example.backend.modules.story;

import com.example.backend.modules.foreshadowing.ForeShadowing;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryForeShadowingRepository extends JpaRepository<StoryForeShadowing, Long> {
    @EntityGraph(attributePaths = {"story"})
    List<StoryForeShadowing> findWithStoryByForeShadowing(ForeShadowing foreShadowing);

    StoryForeShadowing findByForeShadowing(ForeShadowing foreShadowing);

    @EntityGraph(attributePaths = {"foreShadowing"})
    List<StoryForeShadowing> findByStory(Story story);
}
