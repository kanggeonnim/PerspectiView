package com.example.backend.modules.team;

import com.example.backend.modules.user.User;
import com.example.backend.modules.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class TeamServiceTest {

    @Autowired
    TeamService teamService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;
    @Autowired
    EnrollmentRepository enrollmentRepository;

    @BeforeEach
    public void alldelete() {
        userRepository.deleteAll();
        teamRepository.deleteAll();
    }

    private Team makeTeam(User user) {
        Team team = Team.builder().title("team1")
                .info("team info")
                .profileImageUrl("https://s3")
                .personal(false)
                .build();
        return teamService.createTeam(team, user);
    }


    private User makeUser(String username) {
        User user = User.builder().userNickname("nickname")
                .userImageUrl("https://s3")
                .username(username)
                .email("kangkun@naver.com")
                .provider("kakao")
                .providerId("kakao_1234")
                .userInfo("bio")
                .build();

        userRepository.save(user);
        return user;
    }

    @Test
    @DisplayName("team 생성 test")
    public void teamCreate() {
        User user = makeUser("nickname");
        makeTeam(user);

        Assertions.assertEquals(teamRepository.count(), 1);
    }

    @Test
    @DisplayName("team 수정 test")
    public void teamUpdate() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        String changeInfo = "change info";
        Team newTeam = Team.builder().title("team1")
                .info(changeInfo)
                .profileImageUrl("https://s3")
                .personal(false)
                .build();
        teamService.updateTeam(team.getId(), newTeam, user);

        Team findTeam = teamRepository.findById(team.getId()).get();

        Assertions.assertEquals(findTeam.getInfo(), changeInfo);
    }

    @Test
    @DisplayName("enorllment 등록")
    public void createEnrollment() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        User otherUser = makeUser("hello");
        teamService.createEnrollment(team.getId(), otherUser);
        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);
        assertNotNull(enrollment);
    }

    @Test
    @DisplayName("enorllment 취소")
    public void cancelEnrollment() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        User otherUser = makeUser("hello");
        teamService.createEnrollment(team.getId(), otherUser);
        teamService.cancelEnrollment(team.getId(), otherUser);
        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);

        assertNull(enrollment);
    }

    @Test
    @DisplayName("enorllment 허가")
    public void acceptEnrollment() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        User otherUser = makeUser("hello");
        teamService.createEnrollment(team.getId(), otherUser);

        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);
        teamService.acceptEnrollment(team, enrollment.getId(), user);

        Assertions.assertTrue(team.ifMember(otherUser));
        Enrollment Afterenrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);
        Assertions.assertNull(Afterenrollment);
    }

    @Test
    @DisplayName("enorllment 불허")
    public void deniedEnrollment() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        User otherUser = makeUser("hello");
        teamService.createEnrollment(team.getId(), otherUser);

        Enrollment enrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);
        teamService.deniedEnrollment(team, enrollment.getId(), user);

        Assertions.assertFalse(team.ifMember(otherUser));
        Enrollment Afterenrollment = enrollmentRepository.findByTeamAndUser(team, otherUser);
        Assertions.assertNull(Afterenrollment);
    }

    @Test
    @DisplayName("enorllment 조회")
    public void getEnrollment() {
        User user = makeUser("nickname");
        Team team = makeTeam(user);

        User otherUser1 = makeUser("hello1");
        User otherUser2 = makeUser("hello2");
        User otherUser3 = makeUser("hello3");
        teamService.createEnrollment(team.getId(), otherUser1);
        teamService.createEnrollment(team.getId(), otherUser2);
        teamService.createEnrollment(team.getId(), otherUser3);

        List<Enrollment> enrollments = teamService.getEnrollmentWithManager(team.getId());
        Assertions.assertEquals(enrollments.size(), 3);
    }


}