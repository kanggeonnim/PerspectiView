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
    private Plot plot;

    @OneToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Content content;

    @OneToMany
    @JoinColumn(name = "story_relation_id")
    private Set<StoryRelation> storyRelations= new HashSet<>();

    //todo 복선리스트

    //index번호
    @Column(nullable = false)
    private int positionX;

    @Column(nullable = false)
    private Double positionY;

    @Builder
    public Story(Long id, String title, Content content, Set<StoryRelation> storyRelations, int positionX, Double positionY, Plot plot){
        this.id = id;
        this.title = title;
        this.content = content;
        this.storyRelations = storyRelations;
        this.positionX = positionX;
        this.positionY = positionY;
        this.plot = plot;
    }

    //------수정 메서드-----//
    public void updateStory(String title, Content content, Set<StoryRelation> storyRelations, Double positionY){
        this.title = title;
        this.content = content;
        this.storyRelations = storyRelations;
        this.positionY =positionY;
    }

    //-----storyRelation에 추가----//
    public void addStoryRelation(StoryRelation storyRelation){
        this.storyRelations.add(storyRelation);
    }

}