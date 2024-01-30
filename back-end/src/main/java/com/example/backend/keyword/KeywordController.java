package com.example.backend.keyword;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class KeywordController {
    private final KeywordService keywordService;

    @PostMapping("/keyword")
    public String createKeyword(@RequestBody KeywordRequestDto keywordRequestDto){
        keywordService.createKeyword(keywordRequestDto.toEntity());
        return "";
    }

    @GetMapping("/keyword/{keywordId}")
    public String keywordFindById(@PathVariable("keywordId") Long id){
        Optional<Keyword> keyword= keywordService.findById(id);
        return "";
    }

    @GetMapping("/keyword/{keywordName}")
    public String keywordFindByName(@PathVariable("keywordName")String name){
        List<Keyword> keywordList = keywordService.findKeywordByName(name);
        return "";
    }

    @GetMapping("/keyword")
    public String keysordFindAll(){
        List<Keyword> keywordList = keywordService.findAll();
        return "";
    }


}
