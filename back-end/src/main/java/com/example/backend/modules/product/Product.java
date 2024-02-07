package com.example.backend.modules.product;

import com.example.backend.modules.category.Category;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.productrelation.ProductRelation;
import com.example.backend.modules.team.Team;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String productImageuRL;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String info;

    @OneToMany(mappedBy = "product",cascade = CascadeType.REMOVE)
    private Set<ProductGenre> productGenres = new HashSet<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.REMOVE)
    private Set<ProductRelation> productRelations = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "product",cascade = CascadeType.REMOVE)
    private List<Plot> plots = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Builder
    public Product(String title, String info, Category category, Team team,String productImageuRL) {
        this.title = title;
        this.info = info;
        this.category = category;
        this.team = team;
        this.productImageuRL = productImageuRL;
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

    //------작품의 이미지 url만 수정하는 메서드----//
    public void updateProductImage(String productImageuRL) {
        this.productImageuRL = productImageuRL;
    }

    //-------genre set에 추가하는 메서드------//
    public void addProductGenre(ProductGenre productGenre){
        productGenres.add(productGenre);
    }

    public void addPlot(Plot plot){
        plots.add(plot);
    }
}
