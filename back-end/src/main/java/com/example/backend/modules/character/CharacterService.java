package com.example.backend.modules.character;

import com.example.backend.modules.user.User;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
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
    private final ProductService productService;

    /**
     * 등장인물 생성
     *
     * @param character 등장인물
     * @param productId 작품
     * @param teamId    팀 아이디
     * @param user      유저
     * @return 등장인물
     */
    @Transactional
    public Character createCharacter(Character character, Long productId, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        return characterRepository.save(character);
    }


    /**
     * 전체 등장인물 조회
     *
     * @param productId 작품 아이디
     * @param teamId    팀 아이디
     * @param user      유저
     * @return 등장인물 리스트
     */
    public List<Character> getCharacters(Long productId, Long teamId, User user) {
        Product product = productService.findByProductId(user, teamId, productId);
        teamService.checkIfMember(user, teamService.getTeam(teamId));

        // 해당 작품에 포함된 인물인지도 검사해야함.
        return characterRepository.findAllByProduct(product);
    }

    /**
     * 단일 등장인물 조회
     *
     * @param charterId 등장인물 아이디
     * @param productId 작품 아이디
     * @param teamId    팀 아이디
     * @param user      유저
     * @return 등장인물
     */
    public Character getCharacter(Long charterId, Long productId, Long teamId, User user) {
        teamService.checkIfMember(user, teamService.getTeam(teamId));

        // 해당 작품에 포함된 인물인지도 검사해야함.

        return characterRepository.findById(charterId).orElseThrow(() -> new RuntimeException());
    }

    /**
     * 등장인물 정보 수정
     *
     * @param character   등장인물
     * @param characterId 등장인물 아이디
     * @param productId   작품 아이디
     * @param teamId      팀 아이디
     * @param user        유저
     * @return 등장인물
     */
    @Transactional
    public Character updateCharacter(Character character, Long characterId, Long productId, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        Character newCharacter = characterRepository.findById(characterId).orElseThrow(() -> new RuntimeException());
        newCharacter.changeCharacter(character);

        return newCharacter;
    }

    /**
     * 등장인물 삭제
     *
     * @param charterId 등장인물 아이디
     * @param productId 작품 아이디
     * @param teamId    팀 아이디
     * @param user      유저
     */
    @Transactional
    public void deleteCharacter(Long charterId, Long productId, Long teamId, User user) {
        teamService.checkIfManager(user, teamService.getTeam(teamId));

        Character findChar = characterRepository.findById(charterId).orElseThrow(() -> new RuntimeException());

        characterRepository.delete(findChar);
    }
}
