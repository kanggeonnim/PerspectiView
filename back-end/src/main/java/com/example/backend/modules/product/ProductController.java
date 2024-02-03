package com.example.backend.modules.product;

import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.plot.Plot;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product")
public class ProductController {

    private final ProductService productService;

    @PostMapping("/")
    public ApiResult<ProductResponseDto> creatTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto, @PathVariable("teamId") Long teamId,
                                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {


        Product product = productService.createTeamProduct(principalDetails.getUser(), teamId, productRequestDto.of(productRequestDto),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.from(product,genres, null, null));
    }

    @GetMapping("/{productId}")
    public ApiResult<ProductResponseDto> getProduct(@PathVariable("productId") Long productId, @PathVariable("teamId") Long teamId,
                                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Product product = productService.findByProductId(principalDetails.getUser(), teamId, productId);
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        List<ProductRelation> productRelations = productService.findProductRelations(productId);
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.from(product, genres, productRelations, plots));
    }

    @PatchMapping("/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                           @PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        productRequestDto.setProductId(productId);
        Product product = productService.updateProduct(principalDetails.getUser(), teamId, productRequestDto.of(productRequestDto),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        List<ProductRelation> productRelations = productService.findProductRelations(productId);
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.from(product,genres, productRelations, plots));
    }

    @PatchMapping("/title/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProjectTitle(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                                @PathVariable("productId") Long productId,
                                                                @PathVariable("teamId") Long teamId,
                                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
        productRequestDto.setProductId(productId);
        Product product = productService.updateProductTitle(principalDetails.getUser(), teamId, productRequestDto.of(productRequestDto));
        return ApiResult.OK(ProductResponseDto.from(product,null, null, null));
    }

    @DeleteMapping("/{productId}")
    public ApiResult<ProductResponseDto> deleteTeamProject(@PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        productService.deleteProduct(principalDetails.getUser(), teamId, productId);
        return ApiResult.OK(null);
    }


}
