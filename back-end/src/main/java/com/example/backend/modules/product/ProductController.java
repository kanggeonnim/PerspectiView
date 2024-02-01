package com.example.backend.modules.product;

import com.example.backend.modules.account.User;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
        Product product = productService.createTeamProduct(principalDetails.getUser(), team, productRequestDto.of(productRequestDto));
        return ApiResult.OK(ProductResponseDto.from(product));
    }

    @GetMapping("/{productId}")
    public ApiResult<ProductResponseDto> getProduct(@PathVariable("productId") Long productId, @PathVariable("teamId") Long teamId,
                                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        Product product = productService.findByProductId(principalDetails.getUser(), team, productId);
        return ApiResult.OK(ProductResponseDto.from(product));
    }

    @PatchMapping("/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProject(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                           @PathVariable("productId") Long productId,
                                                           @PathVariable("teamId") Long teamId,
                                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        productRequestDto.setProductId(productId);
        Product product = productService.createTeamProduct(principalDetails.getUser(), team, productRequestDto.of(productRequestDto));
        return ApiResult.OK(ProductResponseDto.from(product));
    }

    @PatchMapping("/title/{productId}")
    public ApiResult<ProductResponseDto> updateTeamProjectTitle(@RequestBody @Valid ProductRequestDto productRequestDto,
                                                                @PathVariable("productId") Long productId,
                                                                @PathVariable("teamId") Long teamId,
                                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Team team = teamService.getTeam(teamId);
        productRequestDto.setProductId(productId);
        Product product = productService.updateProductTitle(principalDetails.getUser(), team, productRequestDto.of(productRequestDto));
        return ApiResult.OK(ProductResponseDto.from(product));
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
