package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.genre.Genre;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("team/{teamId}/product")
public class ProductController {

    private final ProductService productService;

    private final TeamService teamService;

    @PostMapping("/")
    public ApiResult<ProductResponseDto> creatTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto, @PathVariable("teamId") Long teamId,
                                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);

        Product product = productService.createTeamProduct(principalDetails.getUser(), team, productRequestDto.of(productRequestDto),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.from(product,genres));
    }

    @GetMapping("/{productId}")
    public ApiResult<ProductResponseDto> getProduct(@PathVariable("productId") Long productId, @PathVariable("teamId") Long teamId,
                                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        Product product = productService.findByProductId(principalDetails.getUser(), team, productId);
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.from(product,genres));
    }

    @PatchMapping("/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                           @PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        productRequestDto.setProductId(productId);
        Product product = productService.updateProduct(principalDetails.getUser(), team, productRequestDto.of(productRequestDto),productRequestDto.getGenres());
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.from(product,genres));
    }

    @PatchMapping("/title/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProjectTitle(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                                @PathVariable("productId") Long productId,
                                                                @PathVariable("teamId") Long teamId,
                                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        productRequestDto.setProductId(productId);
        Product product = productService.updateProductTitle(principalDetails.getUser(), team, productRequestDto.of(productRequestDto));
        List<Genre> genres = productService.findGenreList(product.getProductGenres());
        return ApiResult.OK(ProductResponseDto.from(product,genres));
    }

    @DeleteMapping("/{productId}")
    public ApiResult<ProductResponseDto> deleteTeamProject(@PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        productService.deleteProduct(principalDetails.getUser(), team, productId);
        return ApiResult.OK(null);
    }


}
