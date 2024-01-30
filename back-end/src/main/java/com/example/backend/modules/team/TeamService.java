package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;

    public Team createTeam(Team team, User user){
        Team newTeam = teamRepository.save(team);;
        newTeam.addManager(user);
        return newTeam;
    }

    public List<Team> getTeams(){
        return teamRepository.findAll();
    }

    public Team getTeam(Long id){
        return teamRepository.findById(id).orElseThrow(()-> new RuntimeException());
    }
}
