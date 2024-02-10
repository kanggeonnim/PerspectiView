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
public class TeamResponseWithMembersDto {
    private Long id;
    private List<UserResponseDto> userResponseDtos;
    private String title;
    private String info;
    private boolean personal;

    public static TeamResponseWithMembersDto of(Team team) {

        List<UserResponseDto> users = new ArrayList<>();
        Iterator<User> iterator = team.getManagers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
        }
        iterator = team.getMembers().iterator();
        while(iterator.hasNext()){
            users.add(UserResponseDto.of(iterator.next()));
        }

        return TeamResponseWithMembersDto.builder()
                .id(team.getId())
                .title(team.getTitle())
                .info(team.getInfo())
                .personal(team.isPersonal())
                .userResponseDtos(users)
                .build();
    }
}
