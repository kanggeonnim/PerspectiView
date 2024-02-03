package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.product.Product;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class ForeShadowing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    @Column(nullable = false)
    private String fShadowName;

    @Column(nullable = true)
    private String fShadowContent;

    @Column(nullable = false)
    private boolean fShadowClose;

    @Builder
    public ForeShadowing(Long id, String fShadowName, String fShadowContent, boolean fShadowClose, Product product) {
        this.id = id;
        this.fShadowName = fShadowName;
        this.fShadowContent = fShadowContent;
        this.fShadowClose = fShadowClose;
        this.product = product;
    }

    public void updateForeShadowing(String fShadowName, String fShadowContent, boolean fShadowClose){
        this.fShadowName = fShadowName;
        this.fShadowContent = fShadowContent;
        this.fShadowClose = fShadowClose;
    }
}
