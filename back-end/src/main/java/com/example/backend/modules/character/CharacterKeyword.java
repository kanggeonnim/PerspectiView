package com.example.backend.modules.character;

import com.example.backend.modules.keyword.Keyword;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
public class CharacterKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Character character;

    @ManyToOne
    private Keyword keyword;
}
