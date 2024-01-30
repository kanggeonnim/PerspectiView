package com.example.backend.modules.team;

import com.example.backend.modules.account.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;
    private final EnrollmentRepository enrollmentRepository;

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

    public Team updateTeam(Long teamId, Team team, User user){
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());

        if(!findTeam.ifManager(user)){
            throw new RuntimeException(); // TODO 매니저만 수정가능
        }

        findTeam.changeInfo(team.getInfo());
        return findTeam;
    }

    public void deleteTeam(Long teamId, User user) {
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());

        if(!findTeam.ifManager(user) || findTeam.isPersonal()){
            throw new RuntimeException(); // TODO 매니저만 수정가능, 개인 팀은 삭제불가
        }

        teamRepository.delete(findTeam);
    }

    public void createEnrollment(Long teamId, User user){
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());
        if(!enrollmentRepository.existsByTeamAndUser(findTeam, user)){
            Enrollment enrollment = Enrollment.builder()
                    .team(findTeam)
                    .user(user)
                    .enrolledAt(LocalDateTime.now())
                    .build();
            findTeam.addEnrollment(enrollment); // TODO @OneToMany new Entity 등록 체크
        }
        throw new RuntimeException(); // TODO 이미 존재하는 등록 요청
    }

    public void cancelEnrollment(Long teamId, User user){
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());
        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(findTeam, user);

        if(!enrollment.isAttended()){
            findTeam.removeEnrollment(enrollment);
            enrollmentRepository.delete(enrollment);
        }
    }
}
