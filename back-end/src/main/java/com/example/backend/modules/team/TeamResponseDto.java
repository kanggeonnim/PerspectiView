package com.example.backend.modules.team;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamResponseDto {
    private String title;
    private String info;
    private boolean personal;

    public static TeamResponseDto of(Team team) {
        return TeamResponseDto.builder()
                .title(team.getTitle())
                .info(team.getInfo())
                .personal(team.isPersonal())
                .build();
    }
}
