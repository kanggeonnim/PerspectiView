package com.example.backend.modules.character;

import com.example.backend.modules.exception.NotFoundException;
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
     * @return 등장인물
     */
    @Transactional
    public Character createCharacter(Character character, Long productId) {
        Product product = productService.findByProductId(productId);
        character.setProduct(product);

        return characterRepository.save(character);
    }


    /**
     * 전체 등장인물 조회
     *
     * @param productId 작품 아이디
     * @return 등장인물 리스트
     */
    public List<Character> getCharacters(Long productId) {
        Product product = productService.findByProductId(productId);

        // 해당 작품에 포함된 인물인지도 검사해야함.
        return characterRepository.findAllByProduct(product);
    }

    /**
     * 단일 등장인물 조회
     *
     * @param charterId 등장인물 아이디

     * @return 등장인물
     */
    public Character getCharacter(Long charterId) {

        // 해당 작품에 포함된 인물인지도 검사해야함.

        return characterRepository.findById(charterId).orElseThrow(() -> new NotFoundException());
    }

    /**
     * 등장인물 정보 수정
     *
     * @param character   등장인물
     * @param characterId 등장인물 아이디
     * @return 등장인물
     */
    @Transactional
    public Character updateCharacter(Character character, Long characterId) {

        Character newCharacter = characterRepository.findById(characterId).orElseThrow(() -> new NotFoundException());
        newCharacter.changeCharacter(character);

        return newCharacter;
    }

    /**
     * 등장인물 삭제
     *
     * @param charterId 등장인물 아이디
     */
    @Transactional
    public void deleteCharacter(Long charterId) {
        Character findChar = characterRepository.findById(charterId).orElseThrow(() -> new NotFoundException());

        characterRepository.delete(findChar);
    }
}
