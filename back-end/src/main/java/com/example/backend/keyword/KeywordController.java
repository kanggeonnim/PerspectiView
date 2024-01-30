package com.example.backend.keyword;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/keyword")
public class KeywordController {
    private final KeywordService keywordService;

    @PostMapping("/")
    public String createKeyword(@RequestBody KeywordRequestDto keywordRequestDto){
        keywordService.createKeyword(keywordRequestDto.toEntity());
        return "";
    }

    @GetMapping("/{keywordId}")
    public String keywordFindById(@PathVariable("keywordId") Long id){
        Optional<Keyword> keyword= keywordService.findById(id);
        return "";
    }

    @GetMapping("/{keywordName}")
    public String keywordFindByName(@PathVariable("keywordName")String name){
        List<Keyword> keywordList = keywordService.findKeywordByName(name);
        return "";
    }

    @GetMapping("/")
    public String keysordFindAll(){
        List<Keyword> keywordList = keywordService.findAll();
        return "";
    }


}
