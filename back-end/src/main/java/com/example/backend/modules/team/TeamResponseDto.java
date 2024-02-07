package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class TeamResponseDto {
    private Long id;
    private List<UserResponseDto> userResponseDtos;
    private String title;
    private String info;
    private boolean personal;
    private String profileImageUrl;

    public static TeamResponseDto of(Team team) {
        List<User> managers = team.getManagers();
        List<User> members = team.getMembers();
        List<UserResponseDto> users = new ArrayList<>();
        for(User user : managers){
            users.add(UserResponseDto.of(user));
        }
        for(User user : members){
            users.add(UserResponseDto.of(user));
        }

        return TeamResponseDto.builder()
                .id(team.getId())
                .title(team.getTitle())
                .info(team.getInfo())
                .personal(team.isPersonal())
                .profileImageUrl(team.getTeamImageUrl())
                .userResponseDtos(users)
                .build();
    }
}
