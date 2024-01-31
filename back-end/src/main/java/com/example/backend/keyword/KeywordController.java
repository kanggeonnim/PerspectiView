package com.example.backend.keyword;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/keyword")
public class KeywordController {
    private final KeywordService keywordService;

    @PostMapping("/")
    public ResponseEntity<HttpStatus> createKeyword(@RequestBody KeywordRequestDto keywordRequestDto){
        Keyword keyword = keywordService.createKeyword(keywordRequestDto.toEntity());
        if(keyword!= null){
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/{keywordId}")
    public ResponseEntity<HttpStatus> keywordFindById(@PathVariable("keywordId") Long id){
        Optional<Keyword> keyword= keywordService.findById(id);
        if(keyword!= null){
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/{keywordName}")
    public ResponseEntity<HttpStatus> keywordFindByName(@PathVariable("keywordName")String name){
        List<Keyword> keywordList = keywordService.findKeywordByName(name);
        if(keywordList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<HttpStatus> keysordFindAll(){
        List<Keyword> keywordList = keywordService.findAll();
        if(keywordList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
