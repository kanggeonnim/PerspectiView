package com.example.backend.modules.team;


import com.example.backend.modules.exception.BadRequestException;
import com.example.backend.modules.exception.ForbiddenException;
import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.user.User;

import com.example.backend.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TeamService {
    private final TeamRepository teamRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    public Team createTeam(Team team, User user) {
        Team newTeam = teamRepository.save(team);
        newTeam.addManager(user);

        return newTeam;
    }

    public Team createTeam(Team team, User user, List<User> findUsers) {

        Team newTeam = teamRepository.save(team);
        newTeam.addManager(user);

        log.info("========== add member =================");
        for (User member : findUsers) {
            newTeam.addMember(member);
            log.info("========== add member =================");
        }

        return newTeam;
    }

    // 본인 팀
    public Team getMyTeam(User user) {
        User me = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new NotFoundException());
        return teamRepository.findWithProductByManagersContainingAndPersonal(me, true).get(0);
    }

    // 본인이 속한 팀
    public List<Team> getTeams(User user) {
        User me = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new NotFoundException());
        return teamRepository.findTeamsByMemberOrManagerAndNotPersonal(me);
    }

    public Team getTeam(Long id, User user) {

        Team team = teamRepository.findWithMemberAndManagerAndProductById(id).orElseThrow(() -> new NotFoundException());

        if (team.ifManager(user) || team.ifMember(user)) {
            return team;
        }

        throw new ForbiddenException("not in team");
    }

    public List<Team> searchTeams(String keyword) {
        return teamRepository.findByTitleContains(keyword);
    }

    public Team updateTeam(Long teamId, Team team, User user) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new NotFoundException());

        if (!findTeam.ifManager(user)) {
            throw new ForbiddenException("only manager can do it"); // TODO 매니저만 수정가능
        }

        findTeam.changeInfo(team.getInfo());
        return findTeam;
    }

    public void deleteTeam(Long teamId, User user) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new NotFoundException());

        if (!findTeam.ifManager(user)) {
            throw new ForbiddenException("only manager can do it"); // TODO 매니저만 수정가능 TODO 매니저만 수정가능, 개인 팀은 삭제불가
        }

        if (findTeam.isPersonal()) {
            throw new BadRequestException("personal team can't delete");
        }

        teamRepository.delete(findTeam);
    }

    public void createEnrollment(Long teamId, User user) {
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new NotFoundException());
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
        Team findTeam = teamRepository.findById(teamId).orElseThrow(() -> new NotFoundException());
        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(findTeam, user);
        if (enrollment != null) {
            findTeam.removeEnrollment(enrollment);
            enrollmentRepository.delete(enrollment);
        }
    }

    public Team getTeamToUpdate(User user, Long teamId) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new NotFoundException());
        checkIfManager(user, findTeam);
        return findTeam;
    }

    public void checkIfManager(User user, Team team) {
        if (!team.ifManager(user)) {
            throw new ForbiddenException("only manager can do it");
        }
    }

    /**
     * 사용자가 팀멤버인지 확인
     */
    public void checkIfMember(User user, Team team) {
        if (!team.ifMember(user) && !team.ifManager(user)) {
            throw new ForbiddenException("only team member can do it");
        }
    }

    public void acceptEnrollment(Team team, Long enrollmentId, User user) {
        team.ifManager(user);
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new NotFoundException()); // TODO
        team.addMember(enrollment.getUser()); // TODO check
        enrollmentRepository.delete(enrollment);
    }

    public void deniedEnrollment(Team team, Long enrollmentId, User user) {
        team.ifManager(user);
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new RuntimeException()); // TODO
        enrollmentRepository.delete(enrollment);
    }

    public List<Enrollment> getEnrollmentWithManager(Long teamId) {
        return enrollmentRepository.findByTeamIdOrderByEnrolledAtDesc(teamId);
    }


    public void recruitMember(Long teamId, User manager, User byEmail) {
        Team findTeam = teamRepository.findWithManagerById(teamId).orElseThrow(() -> new NotFoundException());
        checkIfManager(manager, findTeam);
        findTeam.addMember(byEmail);
    }
}
