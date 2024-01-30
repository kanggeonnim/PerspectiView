package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
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

    @Builder
    public Team(String title, String info, Boolean personal) {
        this.title = title;
        this.info = info;
        this.personal = personal;
    }

    @Column(nullable = false)
    private boolean personal;

    @ManyToMany
    private Set<User> managers = new HashSet<>();

    @ManyToMany
    private Set<User> members = new HashSet<>();

    @OneToMany(mappedBy = "team")
    private List<Enrollment> enrollments = new ArrayList<>();

    public void addManager(User user){
        managers.add(user);
    }

    public void addMember(User user){members.add(user);}

    public void changeInfo(String info){
        this.info = info;
    }

    public boolean ifManager(User user){
        return managers.contains(user);
    }

    public void addEnrollment(Enrollment enrollment){
        this.enrollments.add(enrollment);
    }

    public void removeEnrollment(Enrollment enrollment) {
        enrollments.remove(enrollment);
    }


}
