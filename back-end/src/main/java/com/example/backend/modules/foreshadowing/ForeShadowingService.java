package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.story.Story;
import com.example.backend.modules.story.StoryForeShadowing;
import com.example.backend.modules.story.StoryForeShadowingRepository;
import com.example.backend.modules.user.User;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ForeShadowingService {
    private final ForeShadowingRepository foreShadowingRepository;

    private final ProductService productService;

    private final StoryForeShadowingRepository storyForeShadowingRepository;

    /**
     * 복선 생성
     *
     * @param user          사용자
     * @param teamId        팀 아이디
     * @param productId     작품 아이디
     * @param foreShadowing 복선
     * @return
     */
    @Transactional
    public ForeShadowing createForeShadowing(User user, Long teamId, Long productId, ForeShadowing foreShadowing) {
        Product product = productService.findByProductId(user, teamId, productId);

        if (!product.equals(foreShadowing.getProduct())) {
            throw new RuntimeException();
        }

        return foreShadowingRepository.save(foreShadowing);
    }


    /**
     * 작품에 포함된 복선 조회
     *
     * @param user
     * @param teamId
     * @param productId
     * @return
     */
    public List<ForeShadowing> findByProductId(User user, Long teamId, Long productId) {
        Product product = productService.findByProductId(user, teamId, productId);
        return foreShadowingRepository.findByProduct(product);
    }


    /**
     * 복선 수정
     *
     * @param user
     * @param teamId
     * @param productId
     * @param foreShadowing
     * @return
     */
    @Transactional
    public ForeShadowing updateForeShadowing(User user, Long teamId, Long productId, ForeShadowing foreShadowing) {
        Product product = productService.findByProductId(user, teamId, productId);

        if (!product.equals(foreShadowing.getProduct())) {
            throw new RuntimeException();
        }

        ForeShadowing findForeShadowing = foreShadowingRepository.findById(foreShadowing.getId()).orElseThrow(() -> new RuntimeException());
        findForeShadowing.updateForeShadowing(findForeShadowing.getFShadowName(), findForeShadowing.getFShadowContent(), findForeShadowing.getFShadowClose());
        return foreShadowing;
    }

    /**
     * 복선 삭제
     *
     * @param user
     * @param teamId
     * @param productId
     * @param fShadowingId
     */
    @Transactional
    public void deleteForeShadowing(User user, Long teamId, Long productId, Long fShadowingId) {
        ForeShadowing foreShadowing = foreShadowingRepository.findById(fShadowingId).orElseThrow(() -> new RuntimeException());
        if (!foreShadowing.getProduct().getId().equals(productId)) {
            throw new RuntimeException();
        }
        foreShadowingRepository.deleteById(fShadowingId);
    }

    /**
     * 복선의 스토리 리스트 출력
     */
    public List<FshadowStoryIdDto> findStories(ForeShadowing foreShadowing) {
        //복선으로 중간 테이블 리스트 받아오기
        List<StoryForeShadowing> sfs = storyForeShadowingRepository.findByForeShadowing(foreShadowing);
        List<FshadowStoryIdDto> storyids = new ArrayList<>();
        //중간테이블로 스토리 정보 얻기
        for (StoryForeShadowing sf : sfs) {
            //storyforeshadowing에 Entitygraph로 join 해서 story정보 담겨있음
            storyids.add(FshadowStoryIdDto.builder()
                    .storyId(sf.getStory().getId())
                    .build());
        }
        return storyids;
    }

    /**
     * 복선 스토리에 추가
     */


    /**
     * 복선 스토리에서 삭제
     */

    /**
     * 복선 회수
     */

}
