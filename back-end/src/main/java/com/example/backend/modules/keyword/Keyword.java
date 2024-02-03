package com.example.backend.modules.keyword;

import com.example.backend.modules.character.CharacterKeyword;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;


    @OneToMany(mappedBy = "keyword")
    private Set<CharacterKeyword> characterKeywords = new HashSet<>();

    @Builder
    public Keyword(String name) {
        this.name = name;
    }

}
