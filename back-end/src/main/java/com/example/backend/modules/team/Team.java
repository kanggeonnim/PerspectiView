package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String info;

    @Column(nullable = false)
    private Boolean personal;

    @ManyToMany
    private Set<User> managers;

    @ManyToMany
    private Set<User> members;

    @OneToMany
    private List<Enrollment> enrollments;

}
