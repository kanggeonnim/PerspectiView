package com.example.backend.modules.productrelation;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.ProductResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product/{productId}/relation")
public class ProductRelationController {

    private final ProductRelationService productRelationService;

    @GetMapping
    public ApiResult<ProductRelationResponseDto> createProductRelation(@RequestBody @Valid ProductRelationRequestDto productRelationRequestDto, @PathVariable("teamId") Long teamId,
                                                                       @PathVariable("productId") Long productId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ProductRelation productRelation = productRelationService.createProductRelation(productRelationRequestDto.from(productRelationRequestDto));
        return ApiResult.OK(ProductRelationResponseDto.of(productRelation));
    }
}
