package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Iterator;
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

        List<UserResponseDto> users = new ArrayList<>();
        Iterator<User> iterator = team.getManagers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
        }
        iterator = team.getMembers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
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
