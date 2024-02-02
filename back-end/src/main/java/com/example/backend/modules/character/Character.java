package com.example.backend.modules.character;

import jakarta.persistence.*;
import lombok.*;


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

    @Builder(builderMethodName = "positionBuilder")
    public Character(String characterName, String characterDetail, double positionX, double positionY) {
        this.characterName = characterName;
        this.characterDetail = characterDetail;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    public void changeCharacter(Character character) {
        this.characterName = character.getCharacterName();
        this.characterDetail = character.getCharacterDetail();
        this.positionX = character.getPositionX();
        this.positionY = character.getPositionY();
    }
}
