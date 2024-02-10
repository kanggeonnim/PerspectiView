package com.example.backend.modules.genre;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String genreName;

    public void changeGenreName(String genreName) {
        this.genreName = genreName;
    }

    @Builder
    public Genre(Long id, String genreName) {
        this.id = id;
        this.genreName = genreName;
    }
}
