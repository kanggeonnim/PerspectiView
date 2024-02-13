package com.example.backend.modules.story;

import com.example.backend.modules.character.Character;
import com.example.backend.modules.character.CharacterRepository;
import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.foreshadowing.ForeShadowing;
import com.example.backend.modules.foreshadowing.ForeShadowingPreviewDto;
import com.example.backend.modules.foreshadowing.ForeShadowingRepository;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class StoryService {
    private final StoryRepository storyRepository;
    private final ContentRepository contentRepository;
    private final StoryRelationRepository storyRelationRepository;
    private final StoryForeShadowingRepository storyForeShadowingRepository;
    private final ForeShadowingRepository foreShadowingRepository;
    private final PlotRepository plotRepository;
    private final CharacterRepository characterRepository;

    private final RedisTemplate redisTemplate;

    /**
     * 스토리 생성
     */
    @Transactional
    public Story createStory(Story story, Long plotId, String storycontent, List<Character> characters, List<ForeShadowing> foreShadowings) {
        /**
         * 순서는 플롯 안에서의 순서는 따진다.
         * update story s left join plot p
         * on p.plot_id = s.plot_id
         *  set position_x = position_x + 1
         * where position_x>={현재값}
         */
        //content 등록
        Content content = createContent(storycontent);
        story.updateContent(content);

        //먼저 index뒤로 미루기
        storyRepository.updatePositionX(plotId, story.getPositionX());

        //plotId로 plot 찾아오기
        Plot plot = plotRepository.findById(plotId).orElseThrow(() -> new NotFoundException());
        story.updatePlot(plot);

        //content와 plot 저장 후 넣기
        Story madeStory = storyRepository.save(story);

        for (Character c : characters) {
            Character character = characterRepository.findById(c.getId()).orElseThrow(() -> new NotFoundException());
            StoryRelation storyRelation = StoryRelation.builder()
                    .story(madeStory)
                    .character(character).build();
            StoryRelation makeStoryRelation = storyRelationRepository.save(storyRelation);
            madeStory.addStoryRelation(makeStoryRelation);
        }

        //복선스토리 저장
        for (ForeShadowing fs : foreShadowings) {
            ForeShadowing foreShadowing = foreShadowingRepository.findById(fs.getId()).orElseThrow(() -> new NotFoundException());
            createStoryFshadow(foreShadowing.getId(), madeStory.getId());
            StoryForeShadowing storyForeShadowing = StoryForeShadowing.builder()
                    .foreShadowing(foreShadowing)
                    .story(madeStory).build();
//            StoryForeShadowing makeStoryForeShadowing = storyForeShadowingRepository.save(storyForeShadowing);
//            madeStory.addStoryForeShadowing(makeStoryForeShadowing);
        }

        redisTemplate.opsForValue().set("story:" + story.getId(), StoryResponseDto.of(madeStory, characters, foreShadowings));

        return madeStory;
    }

    /**
     * story content 생성
     *
     * @param content
     * @return
     */
    @Transactional
    public Content createContent(String content) {
        Content makeContent = Content.builder()
                .content(content)
                .build();
        return contentRepository.save(makeContent);
    }

    /**
     * 스토리 수정
     *
     * @param story
     * @param characters
     * @param foreShadowings
     * @return
     */
    @Transactional
    public Story updateStory(Long storyId, Story story, List<Character> characters, List<ForeShadowing> foreShadowings) {
        //먼저 있던 리스트를 없애고 새로운 리스트 넣기
        storyRelationRepository.deleteAll(story.getStoryRelations());
        storyForeShadowingRepository.deleteAll(story.getStoryForeShadowings());
        log.info("=============스토리를 찾는다.=============");
        Story findStory = storyRepository.findWithPlotContentById(storyId).orElseThrow(() -> new NotFoundException());

        Set<StoryRelation> storyRelations;
        Set<StoryForeShadowing> storyForeShadowings;

        storyRelations = characters.stream()
                .map(c -> StoryRelation.builder().story(findStory).character(c).build())
                .map(storyRelationRepository::save)
                .collect(Collectors.toSet());

        storyForeShadowings = foreShadowings.stream()
                .map(fs -> StoryForeShadowing.builder().story(findStory).foreShadowing(fs).build())
                .map(storyForeShadowingRepository::save)
                .collect(Collectors.toSet());

        //Content를 가져와서 수정
        Content content = contentRepository.findById(findStory.getContent().getId()).orElseThrow(() -> new NotFoundException());
        content.updateContent(story.getContent().getContent());

        findStory.updateStory(story.getTitle(), content, storyRelations, storyForeShadowings, story.getPositionY());

        redisTemplate.opsForValue().set("story:" + story.getId(), StoryResponseDto.of(findStory, characters, foreShadowings));
        return findStory;
    }

    /**
     * 스토리 삭제
     *
     * @param storyId
     */
    @Transactional
    public void deleteStory(Long storyId) {
        storyRepository.deleteById(storyId);
        redisTemplate.delete("story:" + storyId);
    }

    /**
     * 스토리 아이디로 조회
     *
     * @param storyId
     * @return
     */
    public StoryResponseDto findByStoryId(Long storyId) {
        StoryResponseDto storyResponseDto = (StoryResponseDto) redisTemplate.opsForValue().get("story:" + storyId);
        if (storyResponseDto == null) {
            Story story = storyRepository.findWithPlotContentById(storyId).orElseThrow(() -> new NotFoundException());
            List<Character> characterList = story.getStoryRelations().stream()
                    .map(StoryRelation::getCharacter)
                    .collect(Collectors.toList());

            List<ForeShadowing> foreShadowingList = story.getStoryForeShadowings().stream()
                    .map(StoryForeShadowing::getForeShadowing)
                    .collect(Collectors.toList());

            return StoryResponseDto.of(story, characterList, foreShadowingList);
        } else {
            return storyResponseDto;
        }
    }

    /**
     * 스토리 아이디로 복선 리스트 조회
     */
    public List<ForeShadowing> findFshadowList(Long storyId) {
        //스토리받아서 거기에 있는 스토리복선 관계 리스트 찾기
        Story story = storyRepository.findWithStoryFshadowById(storyId).orElseThrow(() -> new NotFoundException());
        Set<StoryForeShadowing> storyForeShadowings = story.getStoryForeShadowings();
        List<ForeShadowing> foreShadowings = new ArrayList<>();
        //복선스토리관계에서 복선 빼오기
        for (StoryForeShadowing sfs : storyForeShadowings) {
            StoryForeShadowing storyForeShadowing = storyForeShadowingRepository.findWithFshadowById(sfs.getId()).orElseThrow(() -> new NotFoundException());
            foreShadowings.add(storyForeShadowing.getForeShadowing());
        }
        log.info("==============복선 리스트에 모두 추가 완료=================");
        return foreShadowings;
    }


    /**
     * 스토리 y축
     */
    @Transactional
    public Story updatePositionY(Long storyId, Double positionY) {
        Story findStory = storyRepository.findById(storyId).orElseThrow(() -> new NotFoundException());
        log.info("=============스토리 불러옴=============");
        findStory.updatePositionY(positionY);
        log.info("=============스토리 y축 변경함=============");

        StoryResponseDto storyResponseDto = findByStoryId(storyId);
        redisTemplate.opsForValue().set("story:" + storyId, storyResponseDto.updateStoryResponseDto(findStory, storyResponseDto.getCharacters(), storyResponseDto.getForeShadowings()));
        return findStory;
    }


    /**
     * 복선 스토리에 추가
     */
    @Transactional
    public ForeShadowing createStoryFshadow(Long foreshadowingId, Long storyId) {
        ForeShadowing fshadow = foreShadowingRepository.findById(foreshadowingId).orElseThrow(() -> new NotFoundException());

        Story story = storyRepository.findById(storyId).orElseThrow(() -> new NotFoundException());

        //이미 추가되어있는 복선이면 추가되지 않게 처리
        List<StoryForeShadowing> storyForeShadowings = storyForeShadowingRepository.findByStory(story);
        for (StoryForeShadowing sfs : storyForeShadowings) {
            if (sfs.getForeShadowing().equals(fshadow)) {
                return null;
            }
        }

        StoryForeShadowing storyForeShadowing = storyForeShadowingRepository.save(StoryForeShadowing.builder()
                .foreShadowing(fshadow)
                .story(story).build());


        story.addStoryForeShadowing(storyForeShadowing);
        fshadow.addStoryFshadow(storyForeShadowing);

        StoryResponseDto storyResponseDto = findByStoryId(storyId);
        List<ForeShadowingPreviewDto> foreShadowings = storyResponseDto.getForeShadowings();
        foreShadowings.add(ForeShadowingPreviewDto.of(fshadow));
        redisTemplate.opsForValue().set("story:" + storyId, storyResponseDto.updateStoryResponseDto(story, storyResponseDto.getCharacters(), foreShadowings));

        return fshadow;
    }


    /**
     * 복선 스토리에서 삭제
     */
    @Transactional
    public ForeShadowing deleteStoryFshadow(Long foreshadowingId, Long storyId) {
        ForeShadowing fshadow = foreShadowingRepository.findById(foreshadowingId).orElseThrow(() -> new NotFoundException());
        Story story = storyRepository.findById(storyId).orElseThrow(() -> new NotFoundException());

        //복선리스트에서 복선스토리 삭제
        StoryForeShadowing sfs = storyForeShadowingRepository.findByForeShadowingAndStory(fshadow, story);
        fshadow.deleteStoryFshadow(sfs);

        StoryResponseDto storyResponseDto = findByStoryId(storyId);
        List<ForeShadowingPreviewDto> foreShadowings = storyResponseDto.getForeShadowings();
        foreShadowings.remove(ForeShadowingPreviewDto.of(fshadow));
        redisTemplate.opsForValue().set("story:" + storyId, storyResponseDto.updateStoryResponseDto(story, storyResponseDto.getCharacters(), foreShadowings));
        return fshadow;
    }

    /**
     * 복선 회수
     */
    @Transactional
    public ForeShadowing updateFshadowClose(Long fshadowId, Long closeStoryId) {
        ForeShadowing foreShadowing = foreShadowingRepository.findById(fshadowId).orElseThrow(() -> new NotFoundException());

//        StoryForeShadowing delStoryForeShadowing = storyForeShadowingRepository.findByForeShadowing(foreShadowing);
//        storyForeShadowingRepository.delete(delStoryForeShadowing);

        foreShadowing.updateFshadowClose(closeStoryId);

        return foreShadowing;
    }

    /**
     * 복선 회수 취소
     */
    @Transactional
    public ForeShadowing deleteFshadowClose(Long fshadowId, Long closeStoryId) {
        ForeShadowing foreShadowing = foreShadowingRepository.findById(fshadowId).orElseThrow(() -> new NotFoundException());
        foreShadowing.updateFshadowClose(null);
        return foreShadowing;
    }

    /**
     * 스토리 등장인물이랑 같이 조회
     */
    public List<Story> findWithStoryRelation(Plot plot) {
        List<Story> stories = storyRepository.findWithStoryRelationByPlot(plot);
        for (Story s : stories) {
            List<StoryRelation> storyRelations = findWithCharacterByStory(s);
            s.updateStoryRelation(storyRelations);
        }
        return stories;
    }

    /**
     * 스토리관계 인물이랑 같이 조회
     */
    public List<StoryRelation> findWithCharacterByStory(Story story) {
        return storyRelationRepository.findWithCharacterByStory(story);
    }


}
