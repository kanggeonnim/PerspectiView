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
    public ApiResult<ProductRelationResponseDto> createProductRelation(@RequestBody @Valid ProductRelationRequestDto productRelationRequestDto, @PathVariable("teamId") Long teamId,
                                                                       @PathVariable("productId") Long productId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        ProductRelation productRelation = productRelationService.createProductRelation(productRelationRequestDto.from(productRelationRequestDto));
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }

    @PatchMapping("/{relationId}")
    public ApiResult<ProductRelationResponseDto> updateProductRelation(@RequestBody @Valid ProductRelationRequestDto productRelationRequestDto, @PathVariable("teamId") Long teamId,
                                                                       @PathVariable("relationId") Long relationId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        ProductRelation productRelation = productRelationService.updateProductRelation(relationId, productRelationRequestDto.from(productRelationRequestDto));
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }


    @GetMapping
    public ApiResult<List<ProductRelationResponseDto>> getProductRelations(@PathVariable("teamId") Long teamId,
                                                                           @PathVariable("productId") Long productId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<ProductRelation> productRelations = productRelationService.findAllProductRelation(principalDetails.getUser(), teamId, productId);
        return ApiResult.OK(productRelations.stream().map(ProductRelationResponseDto::of)
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{relationId}")
    public ApiResult<Object> deleteProductRelation(@PathVariable("relationId") Long relationId,
                                                   @PathVariable("productId") Long productId,
                                                   @PathVariable("teamId") Long teamId,
                                                   @AuthenticationPrincipal PrincipalDetails principalDetails) {
        productRelationService.deleteProductRelation(relationId);
        return ApiResult.OK(null);
    }

    @GetMapping("/{relationId}")
    public ApiResult<ProductRelationResponseDto> getProductRelation(@PathVariable("relationId") Long relationId, @PathVariable("teamId") Long teamId,
                                                                    @PathVariable("productId") Long productId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        ProductRelation productRelation = productRelationService.findProductRelation(principalDetails.getUser(), teamId, relationId);
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }
}
