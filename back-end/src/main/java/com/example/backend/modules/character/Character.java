package com.example.backend.modules.character;

import com.example.backend.modules.account.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String characterName;

    @Column(nullable = true)
    private String characterDetail;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = true)
    private double positionX;

    @Column(nullable = true)
    private double positionY;

    @Builder
    public Character(String characterName, Long productId) {
        this.characterName = characterName;
        this.productId = productId;
    }

    @Builder
    public Character(String characterName, String characterDetail, Long productId) {
        this.characterName = characterName;
        this.characterDetail = characterDetail;
        this.productId = productId;
    }

}
