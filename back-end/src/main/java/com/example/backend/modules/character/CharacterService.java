package com.example.backend.modules.character;

import com.example.backend.modules.team.TeamRepository;
import com.example.backend.modules.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CharacterService {
    private final CharacterRepository characterRepository;
    private final TeamService teamService;

    public Character createCharacter(Character character) {
        Character newCharacter = characterRepository.save(character);
        return newCharacter;
    }

    public Character getCharacter(Long charId)
}
