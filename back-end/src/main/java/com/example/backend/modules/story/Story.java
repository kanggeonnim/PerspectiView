package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.plot.Plot;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Story {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plot_id")
    private Plot plot;

    @OneToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Content content;

    @OneToMany(mappedBy = "story")
    private Set<StoryRelation> storyRelations = new HashSet<>();

    @OneToMany(mappedBy = "story")
    private Set<StoryForeShadowing> storyForeShadowings = new HashSet<>();

    //index번호
    @Column(nullable = false)
    private int positionX;


    @Column(nullable = false)
    private Double positionY;

    @Builder
    public Story(Long id, String title, Content content, Set<StoryRelation> storyRelations, Set<StoryForeShadowing> storyForeShadowings, int positionX, Double positionY, Plot plot){
        this.id = id;
        this.title = title;
        this.content = content;
        this.storyRelations = storyRelations;
        this.storyForeShadowings = storyForeShadowings;
        this.positionX = positionX;
        this.positionY = positionY;
        this.plot = plot;
    }

    //------수정 메서드-----//
    public void updateStory(String title, Content content, Set<StoryRelation> storyRelations,Set<StoryForeShadowing> storyForeShadowings, Double positionY){
        this.title = title;
        this.content = content;
        this.storyForeShadowings = storyForeShadowings;
        this.storyRelations = storyRelations;
        this.positionY =positionY;
    }

    //-----storyRelation에 추가----//
    public void addStoryRelation(StoryRelation storyRelation){
        this.storyRelations.add(storyRelation);
    }


    //-----storyForeShadowing에 추가-----//
    public void addStoryForeShadowing(StoryForeShadowing storyForeShadowing) {
        this.storyForeShadowings.add(storyForeShadowing);}

    //-----y축 바꾸는 메서드-----//
    public void updatePositionY(Double positionY){
        this.positionY = positionY;
    }
}
