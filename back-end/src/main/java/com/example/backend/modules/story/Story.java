package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.plot.Plot;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plot_id")
    private Plot plot;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Content content;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "story")
    private Set<StoryRelation> storyRelations = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "story")
    private Set<StoryForeShadowing> storyForeShadowings = new HashSet<>();

    //index번호
    @Column(nullable = false)
    private int positionX;

    @Column(nullable = false)
    private Double positionY;

    @Builder
    public Story(String title, Content content, List<StoryRelation> storyRelations, List<StoryForeShadowing> storyForeShadowings, int positionX, Double positionY, Plot plot) {
        this.title = title;
        this.content = content;
        if (storyRelations != null) storyRelations.addAll(storyRelations);
        if (storyForeShadowings != null) storyForeShadowings.addAll(storyForeShadowings);
        this.positionX = positionX;
        this.positionY = positionY;
        this.plot = plot;
    }

    //------수정 메서드-----//
    public void updateStory(String title, Content content) {
        this.title = title;
        this.content = content;
    }

    //-----storyRelation에 추가----//
    public void addStoryRelation(StoryRelation storyRelation) {
        storyRelations.add(storyRelation);
    }


    //-----storyForeShadowing에 추가-----//
    public void addStoryForeShadowing(StoryForeShadowing storyForeShadowing) {
        this.storyForeShadowings.add(storyForeShadowing);
    }

    //-----y축 바꾸는 메서드-----//
    public void updatePositionY(Double positionY) {
        this.positionY = positionY;
    }

    //-----content 바꾸는 메서드-----//
    public void updateContent(Content content) {
        this.content = content;
    }

    //-----plot 설정하는 메서드-----//
    public void updatePlot(Plot plot) {
        this.plot = plot;
    }

    public void updateStoryRelation(List<StoryRelation> storyRelations) {
        if (storyRelations != null) storyRelations.addAll(storyRelations);
    }
}
