package com.example.backend.modules.team;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
@Tag(name = "team", description = "Team 도메인 컨트롤러")
public class TeamController {
    private final TeamService teamService;

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "401", description = "please login"),
            @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @PostMapping
    public ApiResult<TeamResponseWithMembersDto> createTeam(@RequestBody @Valid TeamRequestWithUsersDto teamRequestDto,
                                                            @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        Team team = TeamRequestWithUsersDto.from(teamRequestDto);


        Team newTeam = teamService.createTeam(team, principalDetails.getUser());
        return ApiResult.OK(TeamResponseWithMembersDto.of(newTeam));
    }
    @GetMapping("/search")
    public ApiResult<List<TeamResponseDto>> searchTeam(@RequestParam(required = false) String keyword){
        return ApiResult.OK(teamService.searchTeams(keyword).stream().map(TeamResponseDto::of).collect(Collectors.toList()));
    }

    @GetMapping
    public ApiResult<List<TeamResponseDto>> getTeams(@AuthenticationPrincipal PrincipalDetails principalDetails){
        List<Team> myTeams = new ArrayList<>();
        myTeams.add(teamService.getMyTeam(principalDetails.getUser()));

        List<Team> teams = teamService.getTeams(principalDetails.getUser());
        myTeams.addAll(teams);

        return ApiResult.OK(myTeams.stream().map(TeamResponseDto::of)
                .collect(Collectors.toList()));
    }

    @GetMapping("/my")
    public ApiResult<TeamResponseDto> getMyTeam(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return ApiResult.OK(TeamResponseDto.of(teamService.getMyTeam(principalDetails.getUser())));
    }


    @GetMapping("/{teamId}")
    public ApiResult<TeamResponseWithMembersAndProductsDto> getTeam(@PathVariable Long teamId,
                                                                    @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.getTeam(teamId, principalDetails.getUser());
        return ApiResult.OK(TeamResponseWithMembersAndProductsDto.of(team));
    }

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
                    @ApiResponse(responseCode = "401", description = "please login"),
                    @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @PutMapping("/{teamId}")
    public ApiResult<TeamResponseWithMembersDto> updateTeam(@PathVariable Long teamId,
                                                            @AuthenticationPrincipal PrincipalDetails principalDetails,
                                                            @RequestBody @Valid TeamRequestDto teamRequestDto){
        Team team = teamService.updateTeam(teamId, TeamRequestDto.from(teamRequestDto), principalDetails.getUser());
        return ApiResult.OK(TeamResponseWithMembersDto.of(team));
    }

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
                    @ApiResponse(responseCode = "401", description = "please login"),
                    @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @DeleteMapping("/{teamId}")
    public ApiResult<Object> deleteTeam(@PathVariable Long teamId,
                                                 @AuthenticationPrincipal PrincipalDetails principalDetails){
        teamService.deleteTeam(teamId,  principalDetails.getUser());
        return ApiResult.OK(null);
    }

    @PostMapping("/{teamId}/enrollments")
    public ApiResult<Object> newEnrollment(@PathVariable Long teamId,
                                            @AuthenticationPrincipal PrincipalDetails principalDetails){

        teamService.createEnrollment(teamId, principalDetails.getUser());
        return ApiResult.OK(null);
    }

    @DeleteMapping("/{teamId}/enrollments")
    public ApiResult<Object> disEnrollment(@PathVariable Long teamId,
                                           @AuthenticationPrincipal PrincipalDetails principalDetails){

        teamService.cancelEnrollment(teamId, principalDetails.getUser());
        return ApiResult.OK(null);
    }

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
                    @ApiResponse(responseCode = "401", description = "please login"),
                    @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @GetMapping("/{teamId}/enrollments/{enrollmentId}")
    public ApiResult<Object> acceptEnrollment(@PathVariable Long teamId,
                                              @PathVariable Long enrollmentId,
                                              @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.getTeamToUpdate(principalDetails.getUser(), teamId);
        teamService.acceptEnrollment(team, enrollmentId, principalDetails.getUser());
        return ApiResult.OK(null);
    }

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
                    @ApiResponse(responseCode = "401", description = "please login"),
                    @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @PostMapping("/{teamId}/enrollments/{enrollmentId}")
    public ApiResult<Object> deniedEnrollment(@PathVariable Long teamId,
                                              @PathVariable Long enrollmentId,
                                              @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.getTeamToUpdate(principalDetails.getUser(), teamId);
        teamService.deniedEnrollment(team, enrollmentId, principalDetails.getUser());

        return ApiResult.OK(null);
    }

    @GetMapping("/{teamId}/enrollments")
    public ApiResult<Object> getEnrollment(@PathVariable Long teamId,
                                              @AuthenticationPrincipal PrincipalDetails principalDetails){

        Team team = teamService.getTeamToUpdate(principalDetails.getUser(), teamId);
        List<Enrollment> enrollments = teamService.getEnrollmentWithManager(teamId);

        return ApiResult.OK(enrollments.stream()
                .map(EnrollmentResponseDto::of).collect(Collectors.toList()));
    }
}
