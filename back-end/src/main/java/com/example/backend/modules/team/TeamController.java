package com.example.backend.modules.team;

import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
@Tag(name = "team", description = "Team 도메인 컨트롤러")
public class TeamController {
    private final TeamService teamService;
    private final S3Uploader s3Uploader;
    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "401", description = "please login"),
            @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResult<TeamResponseWithMembersDto> createTeam(@RequestBody @Valid TeamRequestDto teamRequestDto,
                                                            @RequestPart(required = false) MultipartFile uploadImage,
                                                            @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        Team team = TeamRequestDto.from(teamRequestDto);

        if(uploadImage != null){
            String url = s3Uploader.upload(uploadImage).orElseThrow(() -> new IllegalArgumentException());
            team.addImageUrl(url);
        }

        Team newTeam = teamService.createTeam(team, principalDetails.getUser());
        return ApiResult.OK(TeamResponseWithMembersDto.of(newTeam));
    }

    @GetMapping
    public ApiResult<List<TeamResponseDto>> getTeams(){
        List<Team> teams = teamService.getTeams();
        return ApiResult.OK(teams.stream().map(TeamResponseDto::of)
                .collect(Collectors.toList()));
    }


    @GetMapping("/{teamId}")
    public ApiResult<TeamResponseWithMembersDto> getTeam(@PathVariable Long teamId){
        Team team = teamService.getTeam(teamId);
        return ApiResult.OK(TeamResponseWithMembersDto.of(team));
    }

    @Operation(
            responses = {@ApiResponse(responseCode = "200", description = "successful operation"),
                    @ApiResponse(responseCode = "401", description = "please login"),
                    @ApiResponse(responseCode = "403", description = "not manager")
            }
    )
    @PatchMapping("/{teamId}")
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
