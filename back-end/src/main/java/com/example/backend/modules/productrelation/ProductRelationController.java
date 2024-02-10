package com.example.backend.modules.productrelation;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.ProductResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product/{productId}/relation")
public class ProductRelationController {

    private final ProductRelationService productRelationService;

    @PostMapping
    public ApiResult<ProductRelationResponseDto> createProductRelation(@PathVariable("productId") Long productId,
                                                                       @RequestBody @Valid ProductRelationRequestDto productRelationRequestDto) {
        ProductRelation productRelation = productRelationService.createProductRelation(productId, productRelationRequestDto.from(productRelationRequestDto));
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }

    @PutMapping("/{relationId}")
    public ApiResult<ProductRelationResponseDto> updateProductRelation(@RequestBody @Valid ProductRelationRequestDto productRelationRequestDto,
                                                                       @PathVariable("relationId") Long relationId) {
        ProductRelation productRelation = productRelationService.updateProductRelation(relationId, productRelationRequestDto.from(productRelationRequestDto));
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }


    @GetMapping
    public ApiResult<List<ProductRelationResponseDto>> getProductRelations(@PathVariable("productId") Long productId) {
        List<ProductRelation> productRelations = productRelationService.findAllProductRelation( productId);
        return ApiResult.OK(productRelations.stream().map(ProductRelationResponseDto::of)
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{relationId}")
    public ApiResult<Object> deleteProductRelation(@PathVariable("relationId") Long relationId) {
        productRelationService.deleteProductRelation(relationId);
        return ApiResult.OK(null);
    }

    @GetMapping("/{relationId}")
    public ApiResult<ProductRelationResponseDto> getProductRelation(@PathVariable("relationId") Long relationId) {
        ProductRelation productRelation = productRelationService.findProductRelation(relationId);
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));

    }

}

