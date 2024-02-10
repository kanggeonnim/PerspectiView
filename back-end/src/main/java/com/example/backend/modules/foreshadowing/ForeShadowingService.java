package com.example.backend.modules.foreshadowing;

import com.example.backend.modules.exception.NotFoundException;
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

     * @param foreShadowing 복선
     * @return
     */
    @Transactional
    public ForeShadowing createForeShadowing(ForeShadowing foreShadowing, Long productId) {
        Product product = productService.findByProductId(productId);
        foreShadowing.updateProduct(product);
        return foreShadowingRepository.save(foreShadowing);
    }


    /**
     * 작품에 포함된 복선 조회
     * @param productId
     * @return
     */
    public List<ForeShadowing> findByProductId(Long productId) {
        Product product = productService.findByProductId(productId);
        return foreShadowingRepository.findByProduct(product);
    }


    /**
     * 복선 수정
     * @param foreShadowing
     * @return
     */
    @Transactional
    public ForeShadowing updateForeShadowing(ForeShadowing foreShadowing) {

        ForeShadowing findForeShadowing = foreShadowingRepository.findById(foreShadowing.getId()).orElseThrow(() -> new NotFoundException());
        findForeShadowing.updateForeShadowing(foreShadowing.getFShadowName(), foreShadowing.getFShadowContent());
        return foreShadowing;
    }

    /**
     * 복선 삭제
     * @param fShadowingId
     */
    @Transactional
    public void deleteForeShadowing(Long fShadowingId) {
        foreShadowingRepository.deleteById(fShadowingId);
    }

    /**
     * 복선의 스토리 리스트 출력
     */
    public List<FshadowStoryIdDto> findStories(ForeShadowing foreShadowing) {
        //복선으로 중간 테이블 리스트 받아오기
        List<StoryForeShadowing> sfs = storyForeShadowingRepository.findWithStoryByForeShadowing(foreShadowing);
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

}
