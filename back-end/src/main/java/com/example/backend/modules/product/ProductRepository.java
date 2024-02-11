package com.example.backend.modules.product;

import com.example.backend.modules.team.Team;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @EntityGraph(attributePaths = {"team"})
    Optional<Product> findWithTeamById(Long id);

    @EntityGraph(attributePaths = {"productRelations"})
    Optional<Product> findWithProductRelationById(Long id);

    @EntityGraph(attributePaths = {"productGenres","category"})
    Optional<Product> findWithGenreCategoryById(Long id);

    @EntityGraph(attributePaths = "category")
    List<Product> findByTeamId(Long teamId);

    @EntityGraph(attributePaths = {"plots"})
    Product findWithPlotById(Long id);

    @EntityGraph(attributePaths = {"productGenres"})
    Product findWithProductGenreById(Long id);
}
