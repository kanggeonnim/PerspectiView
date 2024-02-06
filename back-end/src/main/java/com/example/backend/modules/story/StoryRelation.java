package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class StoryRelation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "story_id")
    private Story story;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "charater_id")
    private Character character;

    @Builder
    public StoryRelation(Story story, Character character){
        this.story = story;
        this.character = character;
    }
}
