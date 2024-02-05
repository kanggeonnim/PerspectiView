package com.example.backend.modules.story;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRelationRepository extends JpaRepository<StoryRelation, Long> {
}
