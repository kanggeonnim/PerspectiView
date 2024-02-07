package com.example.backend.modules.product;

import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.productrelation.ProductRelation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product")
public class ProductController {

    private final ProductService productService;
    private final S3Uploader s3Uploader;

    @PostMapping
    public ApiResult<ProductResponseDto> creatTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto, @PathVariable("teamId") Long teamId,
                                                          @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {

        String ProductImageUrl = String.valueOf(s3Uploader.upload(productRequestDto.getMultipartFile()));
        Product product = productService.createTeamProduct(productRequestDto.from(productRequestDto, ProductImageUrl),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.of(product,genres, null));
    }

    @GetMapping("/{productId}")
    public ApiResult<ProductResponseDto> getProduct(@PathVariable("productId") Long productId, @PathVariable("teamId") Long teamId,
                                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Product product = productService.findByProductId(principalDetails.getUser(), teamId, productId);
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
//        List<ProductRelation> productRelations = productService.findProductRelations(productId);
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.of(product, genres, plots));
    }

    @PatchMapping("/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                           @PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) throws IOException {
        String ProductImageUrl = null;
        if(productRequestDto.getMultipartFile()!=null){
            ProductImageUrl = String.valueOf(s3Uploader.upload(productRequestDto.getMultipartFile()));
        }
//        productRequestDto.setProductId(productId);
        Product product = productService.updateProduct(productId, productRequestDto.from(productRequestDto,ProductImageUrl),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
//        List<ProductRelation> productRelations = productService.findProductRelations(productId);
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.of(product,genres, plots));
    }

    @PatchMapping("/title/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProjectTitle(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                                @PathVariable("productId") Long productId,
                                                                @PathVariable("teamId") Long teamId,
                                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        productRequestDto.setProductId(productId);
        Product product = productService.updateProductTitle(productId , productRequestDto.from(productRequestDto,null));
        return ApiResult.OK(ProductResponseDto.of(product,null, null));
    }

    @DeleteMapping("/{productId}")
    public ApiResult<ProductResponseDto> deleteTeamProject(@PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        productService.deleteProduct(productId);
        return ApiResult.OK(null);
    }


}
