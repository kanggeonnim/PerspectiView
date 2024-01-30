package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByTeamAndUser(Team team, User user);

    Enrollment findByTeamAndUser(Team team, User user);
}
