package com.example.backend.modules.character;

import com.example.backend.modules.keyword.Keyword;
import com.example.backend.modules.product.Product;
import jakarta.persistence.*;
import lombok.*;

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
    private String characterImageUrl;

    @Column(nullable = true)
    private String characterDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "character")
    private Set<CharacterKeyword> characterKeywords = new HashSet<>();

    @Column(nullable = true)
    private double positionX;

    @Column(nullable = true)
    private double positionY;

    @Builder
    public Character(String characterName, Product product) {
        this.characterName = characterName;
        this.product = product;
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
        this.characterImageUrl = character.getCharacterImageUrl();
        this.characterDetail = character.getCharacterDetail();
        this.positionX = character.getPositionX();
        this.positionY = character.getPositionY();
    }

    public void addKeyword(CharacterKeyword characterKeyword) {
        this.characterKeywords.add(characterKeyword);
    }

    public void removeKeywords(CharacterKeyword characterKeyword) {
        characterKeywords.remove(characterKeyword);
    }
}
