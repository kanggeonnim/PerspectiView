package com.example.backend.modules.team;

import com.example.backend.modules.account.Account;
import com.example.backend.modules.account.User;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@EqualsAndHashCode(of = "id")
public class Enrollment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Team team;

    @ManyToOne
    private User user;

    private LocalDateTime enrolledAt;

    private boolean accepted;
}
