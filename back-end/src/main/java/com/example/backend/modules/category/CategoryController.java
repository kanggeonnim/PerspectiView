package com.example.backend.modules.category;

import com.example.backend.modules.api.ApiError;
import com.example.backend.modules.api.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/")
    public ApiResult<List<CategoryResponseDto>> findAllCategory() {
        List<Category> categories = categoryService.findAll();
        System.out.println("전체조회를 들어옴");
        return ApiResult.OK(categories.stream().map(CategoryResponseDto::of)
                .collect(Collectors.toList()));
    }

    @GetMapping("/{categoryId}")
    public ApiResult<CategoryResponseDto> findById(@PathVariable("categoryId") Long id) {
        Category findcategory = Category.builder()
                .id(id)
                .build();
        Optional<Category> category = categoryService.findById(findcategory);
        return ApiResult.OK(CategoryResponseDto.of(category.get()));
    }

}
