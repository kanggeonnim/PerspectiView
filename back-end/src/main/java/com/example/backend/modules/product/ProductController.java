package com.example.backend.modules.product;

import com.aspose.words.Document;
import com.aspose.words.DocumentBuilder;
import com.example.backend.infra.s3.S3Uploader;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.genre.GenreRequestDto;
import com.example.backend.modules.genre.GenreResponseDto;
import com.example.backend.modules.plot.Plot;
import com.example.backend.modules.plot.PlotResponseDto;
import com.example.backend.modules.story.Story;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    private final ProductRepository productRepository;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResult<ProductResponseDto> creatTeamProject(@RequestPart @Valid ProductRequestDto productRequestDto,
                                                          @RequestPart(value = "uploadImage",required = false) MultipartFile uploadImage,
                                                          @PathVariable("teamId")Long teamId) throws IOException {

        Product product = ProductRequestDto.from(productRequestDto);
        log.info("product : {}" , productRequestDto);

        if(uploadImage!=null){
            String url = s3Uploader.upload(uploadImage).orElseThrow(()->new IllegalArgumentException());
            product.updateProductImage(url);
        }
        log.info("=========createTeamController==========");
        Product newProduct =  productService.createTeamProduct(product, teamId,productRequestDto.getGenres().stream().map(GenreRequestDto::of).collect(Collectors.toList()));
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

    @GetMapping("/{productId}/word")
    public ResponseEntity<byte[]> generateWord(@PathVariable("productId") Long productId) {
        try {
            Document doc = productService.findWithStoryContentByProductId(productId);


            // 워드 문서를 바이트 배열로 저장
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            doc.save(outputStream, com.aspose.words.SaveFormat.DOCX);

            // HTTP 응답 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            headers.setContentDispositionFormData("filename", "product.docx");

            // 바이트 배열을 HTTP 응답 본문으로 설정하여 반환
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ApiResult<List<ProductResponseGenreDto>> getProductList(@PathVariable("teamId") Long teamId){
        //teamId로 productList받기, 장르 미포함
//        List<Product> products = productService.productList(teamId);
        List<Product> products = productService.productGenreCategoryList(teamId);
        List<ProductResponseGenreDto> productResponseDtos = products.stream()
                .map(product -> ProductResponseGenreDto.of(
                        product,
                        productService.findGenreList(product.getProductGenres()).stream()
                                .map(GenreResponseDto::of).collect(Collectors.toList()))).collect(Collectors.toList());
        return ApiResult.OK(productResponseDtos);
    }
    
    //todo 팀에 있는 작품 이름으로 검색

    @PutMapping(value = "/{productId}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResult<ProductResponseOnlyDto> updateTeamProject(@RequestPart @Valid ProductRequestDto productRequestDto,
                                                           @RequestPart(required = false) MultipartFile uploadImage,
                                                           @PathVariable("productId") Long productId) throws IOException {

        Product product = ProductRequestDto.from(productRequestDto);
        if(uploadImage!=null){
            String url = s3Uploader.upload(uploadImage).orElseThrow(()->new IllegalArgumentException());
            product.updateProductImage(url);
        }
        productService.updateProduct(productId, productRequestDto.from(productRequestDto),productRequestDto.getGenres().stream().map(GenreRequestDto::of).collect(Collectors.toList()));
//        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseOnlyDto.of(product));
    }

    @PutMapping("/title/{productId}")
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
