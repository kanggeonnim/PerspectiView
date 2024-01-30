package com.example.backend.modules.team;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("team")
public class TeamController {
    private final TeamService teamService;

    @PostMapping("/")
    public ApiResult<TeamResponseDto> createTeam(@RequestBody @Valid TeamRequestDto teamRequestDto,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.createTeam(TeamRequestDto.from(teamRequestDto), principalDetails.getUser());
        return ApiResult.OK(TeamResponseDto.of(team));
    }

    @GetMapping("/")
    public ApiResult<List<TeamResponseDto>> getTeams(){
        List<Team> teams = teamService.getTeams();
        return ApiResult.OK(teams.stream().map(TeamResponseDto::of)
                .collect(Collectors.toList()));
    }


}
