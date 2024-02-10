package com.example.backend.modules.plot;

import com.example.backend.modules.product.Product;
import com.example.backend.modules.story.Story;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Plot {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Setter
    private String name;

    @Column(nullable = false)
    @Setter
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    private Product product;

    @OneToMany(mappedBy = "plot",cascade = CascadeType.REMOVE)
    private List<Story> stories = new ArrayList<>();

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

    //-----스토리 리스트 업데이트----//
    public void updateStories(List<Story> stories){
        this.stories = stories;
    }


}
