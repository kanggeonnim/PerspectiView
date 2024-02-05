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

    public Team createTeam(Team team, User user) {
        Team newTeam = teamRepository.save(team);
        ;
        newTeam.addManager(user);
        return newTeam;
    }

    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    public Team getTeam(Long id) {
        return teamRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public Team updateTeam(Long teamId, Team team, User user) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new RuntimeException());

        if (!findTeam.ifManager(user)) {
            throw new RuntimeException(); // TODO 매니저만 수정가능
        }

        findTeam.changeInfo(team.getInfo());
        return findTeam;
    }

    public void deleteTeam(Long teamId, User user) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new RuntimeException());

        if (!findTeam.ifManager(user) || findTeam.isPersonal()) {
            throw new RuntimeException(); // TODO 매니저만 수정가능, 개인 팀은 삭제불가
        }

        teamRepository.delete(findTeam);
    }

    public void createEnrollment(Long teamId, User user) {
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());
        if (!enrollmentRepository.existsByTeamAndUser(findTeam, user)) {
            Enrollment enrollment = Enrollment.builder()
                    .team(findTeam)
                    .user(user)
                    .enrolledAt(LocalDateTime.now())
                    .build();
            enrollmentRepository.save(enrollment);
            findTeam.addEnrollment(enrollment); // TODO @OneToMany new Entity 등록 체크

        }

    }

    public void cancelEnrollment(Long teamId, User user) {
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException());
        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(findTeam, user);
        if(enrollment != null){
            findTeam.removeEnrollment(enrollment);
            enrollmentRepository.delete(enrollment);
        }
    }

    public Team getTeamToUpdate(User user, Long teamId) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new RuntimeException()); // TODO entityGraph
        checkIfManager(user, findTeam);
        return findTeam;
    }

    public void checkIfManager(User user, Team team) {
        if (!team.ifManager(user)) {
            throw new RuntimeException(); // TODO Manager 아님, exception
        }
    }

    /**
     * 사용자가 팀멤버인지 확인
     */
    public void checkIfMember(User user, Team team) {
        if (!team.ifMember(user) && !team.ifManager(user)) {
            throw new RuntimeException(); // TODO Member 아님, exception
        }
    }

    public void acceptEnrollment(Team team, Long enrollmentId, User user) {
        team.ifManager(user);
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new RuntimeException()); // TODO
        team.addMember(enrollment.getUser()); // TODO check
        enrollmentRepository.delete(enrollment);
    }

    public void deniedEnrollment(Team team, Long enrollmentId, User user) {
        team.ifManager(user);
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new RuntimeException()); // TODO
        enrollmentRepository.delete(enrollment);
    }

    public List<Enrollment> getEnrollmentWithManager(Long teamId){
        return enrollmentRepository.findByTeamIdOrderByEnrolledAtDesc(teamId);
    }
}
