package com.example.backend.modules.story;

import com.example.backend.modules.plot.Plot;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story,Long> {
    @Modifying
    @Query("UPDATE Story s " +
            "SET s.positionX = s.positionX + 1 " +
            "WHERE s.plot.id = :plotId AND s.positionX >= :positionX")
    void updatePositionX(@Param("plotId") Long plotId, @Param("positionX") int positionX);

    @EntityGraph(attributePaths = {"plot"})
    List<Story> findWithPlotByPlot(Plot plot);

    @EntityGraph(attributePaths = {"plot"})
    Optional<Story> findWithPlotById(Long id);
}
