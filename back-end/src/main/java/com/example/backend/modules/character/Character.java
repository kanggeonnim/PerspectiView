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
@Table(name = "characters")
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
    @Setter
    private Product product;

    @OneToMany(mappedBy = "character")
    private Set<CharacterKeyword> characterKeywords = new HashSet<>();

    @Column(nullable = true)
    private double positionX;

    @Column(nullable = true)
    private double positionY;

    @Builder
    public Character(Long id, String characterName, String characterImageUrl, String characterDetail, Product product, Set<CharacterKeyword> characterKeywords, double positionX, double positionY) {
        this.id = id;
        this.characterName = characterName;
        this.characterImageUrl = characterImageUrl;
        this.characterDetail = characterDetail;
        this.product = product;
        this.characterKeywords = characterKeywords;
        this.positionX = positionX;
        this.positionY = positionY;
    }


    public void addImageUrl(String url) {
        this.characterImageUrl = url;
    }

    public void addKeyword(CharacterKeyword characterKeyword) {
        this.characterKeywords.add(characterKeyword);
    }

    public void removeKeywords(CharacterKeyword characterKeyword) {
        characterKeywords.remove(characterKeyword);
    }

    public void changeCharacter(Character character) {
        this.characterName = character.getCharacterName();
        this.characterImageUrl = character.getCharacterImageUrl();
        this.characterDetail = character.getCharacterDetail();
        this.positionX = character.getPositionX();
        this.positionY = character.getPositionY();
    }

}
