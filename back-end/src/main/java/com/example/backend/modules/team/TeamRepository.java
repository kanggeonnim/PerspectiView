package com.example.backend.modules.team;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @EntityGraph(attributePaths = {"managers", "members"})
    Optional<Team> findWithMemberAndManagerById(Long id);

    @EntityGraph(attributePaths = "managers")
    Optional<Team> findWithManagerById(Long id);


}
