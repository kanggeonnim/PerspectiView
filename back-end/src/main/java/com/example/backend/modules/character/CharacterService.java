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

    @Transactional
    public Character createCharacter(Character character, Team team, User user) {
        teamService.checkIfManager(user, team);

        return characterRepository.save(character);
    }


    public List<Character> getCharacters(Long productId, Long teamId, User user) {
        teamService.checkIfMember(user, teamService.getTeam(teamId));

        // 해당 작품에 포함된 인물인지도 검사해야함.
        return characterRepository.findAllByProductId(productId);
    }

    public Character getCharacter(Long charId, Team team, User user) {
        teamService.checkIfMember(user, team);

        // 해당 작품에 포함된 인물인지도 검사해야함.

        return characterRepository.findById(charId).orElseThrow(() -> new RuntimeException());
    }

    @Transactional
    public Character updateCharacter(Character character, Team team, User user) {
        teamService.checkIfManager(user, team);

        Character newCharacter = characterRepository.findById(character.getId()).orElseThrow(() -> new RuntimeException());
        return newCharacter;
    }

    @Transactional
    public void deleteCharacter(Long charId, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        Character findChar = characterRepository.findById(charId).orElseThrow(() -> new RuntimeException());

        characterRepository.delete(findChar);
    }
}
