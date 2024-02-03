package com.example.backend.modules.story;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StoryRepository extends JpaRepository<Story,Long> {
    @Modifying
    @Query("UPDATE Story s " +
            "SET s.position_x = :positionx " +
            "WHERE s.plot.id = :plotId")
    void updatePositionX(@Param("plotId") Long plotId, @Param("newPositionX") int positionx);


}
