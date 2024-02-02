package com.example.backend.modules.character;

import com.example.backend.modules.account.User;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.BDDMockito.given;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class CharacterServiceTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private CharacterService characterService;

    @BeforeEach
    public void setup() {

    }

    @Test
    @DisplayName("전체 등장인물 조회 서비스 테스트")
    void 전체인물조회() throws Exception {
        //given
        Character character1 = Character.builder().characterName("뽀로로").productId(1L).build();
        Character character2 = Character.builder().characterName("포비").productId(1L).build();
        Character character3 = Character.builder().characterName("루피").productId(1L).build();

        characterRepository.save(character1);
        characterRepository.save(character2);
        characterRepository.save(character3);
        //when
        List<Character> result = characterRepository.findAllByProductId(1L);

        //then
        Assertions.assertThat(result.size()).isEqualTo(3);
    }

    @Test
    @DisplayName("단일 등장인물 조회 서비스 테스트")
    void 단일인물조회() throws Exception {
        //given
        Character character1 = Character.builder().characterName("뽀로로").productId(1L).build();
        characterRepository.save(character1);
        //when
        Optional<Character> result = characterRepository.findById(1L);

        //then
        Assertions.assertThat(result.get().getCharacterName()).isEqualTo(character1.getCharacterName());
    }

    @Test
    @DisplayName("등장인물 생성 서비스 테스트")
    void 등장인물생성() {
        // given
        Character character1 = Character.builder().characterName("뽀로로").productId(1L).build();
        User user = User.builder().userNickname("nickname").email("email").build();
        Team team = Team.builder().title("title").info("info").personal(false).build();
        team.addManager(user);
        teamRepository.save(team);

        Long productId = 1L;
        // when
        Character result = characterService.createCharacter(character1, productId, team.getId(), user);

        // then
        Assertions.assertThat(result.getCharacterName()).isEqualTo(character1.getCharacterName());
    }

    @Test
    @DisplayName("등장인물 삭제 서비스 테스트")
    void 등장인물삭제() {
        // given
        Character character1 = Character.builder().characterName("뽀로로").productId(1L).build();
        User user = User.builder().userNickname("nickname").email("email").build();
        Team team = Team.builder().title("title").info("info").personal(false).build();
        team.addManager(user);
        teamRepository.save(team);
        Long productId = 1L;
        characterService.createCharacter(character1, productId, team.getId(), user);


        // when

        characterService.deleteCharacter(character1.getId(), productId, team.getId(), user);
        // then
        assertThrows(RuntimeException.class, () -> {
            characterService.getCharacter(character1.getId(), productId, team.getId(), user);
        });
    }
}