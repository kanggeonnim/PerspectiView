package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import com.example.backend.modules.story.Story;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Plot {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    @OneToMany(mappedBy = "plot",cascade = CascadeType.REMOVE)
    private List<Story> stories;

    @Builder
    public Plot(Long id, String name, String color, Product product) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.product = product;
    }

    //-----수정 메서드-----//
    public void updatePlot(String name, String color) {
        this.name = name;
        this.color = color;
    }

}
