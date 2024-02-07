package com.example.backend.modules.category;

import com.example.backend.modules.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * 카테고리 전체 조회
     */
    public List<Category> findAll(){
        return categoryRepository.findAll();
    }

    /**
     * 카테고리 아이디로 조회
     */
    public Category findById(Long id) throws RuntimeException{
        return categoryRepository.findById(id).orElseThrow(()-> new NotFoundException());
    }
}
