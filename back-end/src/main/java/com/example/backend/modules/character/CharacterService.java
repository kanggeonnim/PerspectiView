package com.example.backend.modules.character;

import com.example.backend.modules.account.User;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterService {
    private final CharacterRepository characterRepository;
    private final TeamService teamService;

    /**
     * 등장인물 생성
     * @param character
     * @param teamId
     * @param user
     * @return
     */
    @Transactional
    public Character createCharacter(Character character, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        return characterRepository.save(character);
    }


    /**
     * 전체 등장인물 조회
     * @param productId
     * @param teamId
     * @param user
     * @return
     */
    public List<Character> getCharacters(Long productId, Long teamId, User user) {
        teamService.checkIfMember(user, teamService.getTeam(teamId));

        // 해당 작품에 포함된 인물인지도 검사해야함.
        return characterRepository.findAllByProductId(productId);
    }

    /**
     * 단일 등장인물 조회
     * @param charId
     * @param teamId
     * @param user
     * @return
     */
    public Character getCharacter(Long charId, Long teamId, User user) {
        teamService.checkIfMember(user, teamService.getTeam(teamId));

        // 해당 작품에 포함된 인물인지도 검사해야함.

        return characterRepository.findById(charId).orElseThrow(() -> new RuntimeException());
    }

    /**
     * 등장인물 정보 수정
     * @param character
     * @param teamId
     * @param user
     * @return
     */
    @Transactional
    public Character updateCharacter(Character character, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        Character newCharacter = characterRepository.findById(character.getId()).orElseThrow(() -> new RuntimeException());
        return newCharacter;
    }

    /**
     * 등장인물 삭제
     * @param charId
     * @param teamId
     * @param user
     */
    @Transactional
    public void deleteCharacter(Long charId, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        Character findChar = characterRepository.findById(charId).orElseThrow(() -> new RuntimeException());

        characterRepository.delete(findChar);
    }
}
