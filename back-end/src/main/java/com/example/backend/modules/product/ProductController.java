package com.example.backend.modules.product;

import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRequestDto;
import com.example.backend.modules.genre.GenreResponseDto;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product")
@Slf4j
public class ProductController {

    private final ProductService productService;
    private final S3Uploader s3Uploader;

    @PostMapping
    public ApiResult<ProductResponseDto> creatTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                          @RequestPart(required = false) MultipartFile uploadImage) throws IOException {

        Product product = ProductRequestDto.from(productRequestDto);
        log.info("product : {}" , productRequestDto);

        if(uploadImage!=null){
            String url = s3Uploader.upload(uploadImage).orElseThrow(()->new IllegalArgumentException());
            product.updateProductImage(url);
        }
        log.info("=========createTeamController==========");
        Product newProduct =  productService.createTeamProduct(productRequestDto.from(productRequestDto),productRequestDto.getGenres().stream().map(GenreRequestDto::of).collect(Collectors.toList()));
        log.info("=========createTeamController==========");
        List<Genre> genres = productService.findGenreList(newProduct.getProductGenres());
        log.info("=========createTeamController==========");
        log.info("result : {}", ApiResult.OK(ProductResponseDto.of(newProduct,
                genres.stream().map(GenreResponseDto::of).collect(Collectors.toList()),
                null)));
        return ApiResult.OK(ProductResponseDto.of(newProduct,
                genres.stream().map(GenreResponseDto::of).collect(Collectors.toList()),
                null));
    }

    @GetMapping("/{productId}")
    public ApiResult<ProductResponseDto> getProduct(@PathVariable("productId") Long productId) {
        Product product = productService.findByProductId(productId);
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
//        List<ProductRelation> productRelations = productService.findProductRelations(productId);
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.of(product,
                genres.stream().map(GenreResponseDto::of).collect(Collectors.toList()),
                plots.stream().map(PlotResponseDto::of).collect(Collectors.toList())));
    }

    @GetMapping
    public ApiResult<List<ProductResponseOnlyDto>> getProductList(@PathVariable("teamId") Long teamId){
        //teamId로 productList받기
        List<Product> products = productService.productList(teamId);
        return ApiResult.OK(products.stream().map(ProductResponseOnlyDto::of).collect(Collectors.toList()));
    }
    
    //todo 팀에 있는 작품 이름으로 검색

    @PatchMapping("/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                           @RequestPart(required = false) MultipartFile uploadImage,
                                                           @PathVariable("productId") Long productId) throws IOException {

        Product product = ProductRequestDto.from(productRequestDto);
        if(uploadImage!=null){
            String url = s3Uploader.upload(uploadImage).orElseThrow(()->new IllegalArgumentException());
            product.updateProductImage(url);
        }
//        productService.updateProduct(productId, productRequestDto.from(productRequestDto),productRequestDto.getGenres().stream().map(GenreRequestDto::of).collect(Collectors.toList()));
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        List<Plot> plots = productService.findPlots(productId);
        return ApiResult.OK(ProductResponseDto.of(product,
                genres.stream().map(GenreResponseDto::of).collect(Collectors.toList()),
                plots.stream().map(PlotResponseDto::of).collect(Collectors.toList())));
    }

    @PatchMapping("/title/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProjectTitle(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                                @PathVariable("productId") Long productId) {
        Product product = productService.updateProductTitle(productId , productRequestDto.from(productRequestDto));
        return ApiResult.OK(ProductResponseDto.of(product,null, null));
    }

    @DeleteMapping("/{productId}")
    public ApiResult<ProductResponseDto> deleteTeamProject(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);
        return ApiResult.OK(null);
    }


}
