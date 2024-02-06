package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByTeamAndUser(Team team, User user);

    Enrollment findByTeamAndUser(Team team, User user);

    @EntityGraph(attributePaths = {"team.managers", "team.enrollments", "user"})
    List<Enrollment> findByTeamIdOrderByEnrolledAtDesc(Long teamId);
}
