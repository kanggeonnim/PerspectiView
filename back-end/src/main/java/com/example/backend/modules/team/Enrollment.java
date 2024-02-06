package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Team team;

    @ManyToOne
    private User user;

    private LocalDateTime enrolledAt;


    @Builder
    public Enrollment(Team team, User user, LocalDateTime enrolledAt) {
        this.team = team;
        this.user = user;
        this.enrolledAt = enrolledAt;
    }

}
