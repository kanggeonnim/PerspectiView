package com.example.backend.keyword;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;

    /**
     * Keyword 생성
     */
    public Keyword createKeyword(Keyword keyword){
        return  keywordRepository.save(keyword);
    }

    /**
     * Keyword 아이디 조회
     */
    public Optional<Keyword> findById(Long id){
        return  keywordRepository.findById(id);
    }

    /**
     * Keyword 전체 조회
     */
    public List<Keyword> findAll(){
        return keywordRepository.findAll();
    }

    /**
     * Keyword 이름 조회
     */
    public List<Keyword> findKeywordByName(String name){
        return keywordRepository.findByNameContaining(name);
    }


}
