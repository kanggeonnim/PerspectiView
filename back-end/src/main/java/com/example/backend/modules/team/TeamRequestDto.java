package com.example.backend.modules.team;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public class TeamRequestDto {
    @Length(max = 20) @NotNull
    private String teamTitle;
    private String teamInfo;

    @NotNull
    private boolean personal;

}
