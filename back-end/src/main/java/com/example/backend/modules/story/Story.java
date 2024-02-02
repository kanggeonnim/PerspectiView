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
    private String title;

    @OneToMany
    @JoinColumn(name = "story_relation_id")
    private Set<StoryRelation> storyRelations= new HashSet<>();

    //todo 복선리스트

    //index번호
    private Double position_x;
    private Double position_y;

    @Builder
    public Story(Long id, String title, Set<StoryRelation> storyRelations, Double position_x, Double position_y){
        this.id = id;
        this.title = title;
        this.storyRelations = storyRelations;
        this.position_x = position_x;
        this.position_y = position_y;
    }

    //------수정 메서드-----//
    public 

}
