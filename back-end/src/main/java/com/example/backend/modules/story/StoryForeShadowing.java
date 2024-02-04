package com.example.backend.modules.story;

import com.example.backend.modules.foreshadowing.ForeShadowing;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class StoryForeShadowing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Story story;

    @ManyToOne(fetch = FetchType.LAZY)
    private ForeShadowing foreShadowing;

    @Builder
    public StoryForeShadowing(Story story, ForeShadowing foreShadowing) {
        this.story = story;
        this.foreShadowing = foreShadowing;
    }
}
