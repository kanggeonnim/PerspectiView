package com.example.backend.modules.story;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRelationRepository extends JpaRepository<StoryRelation, Long> {

    @EntityGraph(attributePaths = {"character"})
    List<StoryRelation> findWithCharacterByStory(Story story);
}
