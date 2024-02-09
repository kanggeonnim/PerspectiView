package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @EntityGraph("Team.withProductAndManagersAndMembers")
    Optional<Team> findWithMemberAndManagerAndProductById(Long id);

    @EntityGraph(attributePaths = "managers")
    Optional<Team> findWithManagerById(Long id);

    List<Team> findByTitleContains(String title);
    List<Team> findByManagersContainingAndPersonal(User user, boolean personal);

    @EntityGraph(attributePaths = "products")
    List<Team> findWithProductByManagersContainingAndPersonal(User user, boolean personal);
    List<Team> findByMembersContaining(User user);
}
