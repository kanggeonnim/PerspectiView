package com.example.backend.modules.team;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("team")
public class TeamController {
    private final TeamService teamService;

    @PostMapping("/")
    public ApiResult<TeamResponseDto> createTeam(@RequestBody @Valid TeamRequestDto teamRequestDto,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.createTeam(TeamRequestDto.from(teamRequestDto), principalDetails.getUser());
        // 매니저에 추가
        return ApiResult.OK(TeamResponseDto.of(team));
    }


}
