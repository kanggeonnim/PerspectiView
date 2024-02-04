package com.example.backend.modules.product;

import com.example.backend.modules.character.Character;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ProductRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_character_id")
    private Character fromCharacter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_character_id")
    private Character toCharacter;

    @Column(nullable = false)
    private String productRelationInfo;

    @Builder
    public ProductRelation(Product product, Character fromCharacter, Character toCharacter, String productRelationInfo) {
        this.product = product;
        this.fromCharacter = fromCharacter;
        this.toCharacter = toCharacter;
        this.productRelationInfo = productRelationInfo;
    }
}
