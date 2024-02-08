package com.example.backend.modules.product;

import com.example.backend.modules.team.Team;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @EntityGraph(attributePaths = {"team"})
    Optional<Product> findWithTeamById(Long id);


    List<Product> findByTeamId(Long teamId);
}
