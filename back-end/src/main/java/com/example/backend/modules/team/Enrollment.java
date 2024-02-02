package com.example.backend.modules.team;

import com.example.backend.modules.account.Account;
import com.example.backend.modules.account.User;
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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Team team;

    @ManyToOne
    private User user;

    private LocalDateTime enrolledAt;

    private boolean accepted;
    private boolean attended;

    @Builder
    public Enrollment(Team team, User user, LocalDateTime enrolledAt) {
        this.team = team;
        this.user = user;
        this.enrolledAt = enrolledAt;
    }

    public void accepted(){
        accepted = true;
    }

}
