package com.example.backend.modules.team;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
@Data
@Builder
public class TeamRequestDto {
    @Length(max = 20) @NotNull
    private String title;
    private String info;

    @NotNull
    private boolean personal;

    //TODO Multipart Image

    public static Team from(TeamRequestDto teamRequestDto){
        return Team.builder().title(teamRequestDto.getTitle())
                .info(teamRequestDto.getInfo())
                .personal(teamRequestDto.isPersonal())
                .build();
    }
}
