package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.product.Product;
import com.example.backend.modules.story.StoryForeShadowing;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(nullable = true)
    private Long fShadowClose;

    @OneToMany(mappedBy = "foreShadowing")
    private List<StoryForeShadowing> storyForeShadowings = new ArrayList<>();

    @Builder
    public ForeShadowing(Long id, String fShadowName, String fShadowContent, Long fShadowClose, Product product,List<StoryForeShadowing> storyForeShadowings) {
        this.id = id;
        this.fShadowName = fShadowName;
        this.fShadowContent = fShadowContent;
        this.fShadowClose = fShadowClose;
        this.product = product;
        this.storyForeShadowings =storyForeShadowings;
    }

    public void updateForeShadowing(String fShadowName, String fShadowContent, Long fShadowClose){
        this.fShadowName = fShadowName;
        this.fShadowContent = fShadowContent;
        this.fShadowClose = fShadowClose;
    }

    //------storyfshadowList에 추가------//
    public void addStoryFshadow(StoryForeShadowing storyForeShadowing){
        this.storyForeShadowings.add(storyForeShadowing);
    }

    //------storyfshadowList에서 삭제------//
    public void deleteStoryFshadow(StoryForeShadowing storyForeShadowing){
        this.storyForeShadowings.remove(storyForeShadowing);
    }
}
