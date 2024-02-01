package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.team.Team;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = true)
    private String info;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Builder
    public Product(String title, String info, Category category, Team team) {
        this.title = title;
        this.info = info;
        this.category = category;
        this.team = team;
    }

    public void updateProduct(String title, String info, Category category) {
        this.title = title;
        this.info = info;
        this.category = category;
    }

    //------팀의 작품 확인 메서드------//
    public boolean isProductTeam(Team team) {
        if (team.equals(this.team)) {
            return true;
        }
        return false;
    }

    //------작품의 제목만 수정하는 메서드----//
    public void updateProductTitle(String title) {
        this.title = title;
    }
}
