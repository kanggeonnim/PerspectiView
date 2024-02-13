package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoryRelationRepository extends JpaRepository<StoryRelation, Long> {

    @EntityGraph(attributePaths = {"character"})
    List<StoryRelation> findWithCharacterByStory(Story story);

    Optional<StoryRelation> findByStoryAndCharacter(Story story , Character character);
}
