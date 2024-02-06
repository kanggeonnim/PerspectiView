package com.example.backend.infra.security;

import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductService;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.apache.commons.lang3.math.NumberUtils.toLong;

@Component
public class ProductCheckVoter implements AccessDecisionVoter<FilterInvocation> {
    private final RequestMatcher requiresAuthorizationRequestMatcher;
    private final Function<String, Long> teamIdExtractor;
    private final Function<String, Long> productIdExtractor;

    private final TeamService teamService;

    private final ProductService productService;

    @Autowired
    public ProductCheckVoter(TeamService teamService, ProductService productService) {
//        final String regex = "^/api/team/(\\d+)/post/.*$";
        final String regex = "^/api/team/(\\d+)/product/(\\d+)";
        final Pattern pattern = Pattern.compile(regex);
        RequestMatcher requiresAuthorizationRequestMatcher = new RegexRequestMatcher(pattern.pattern(), null);

        teamIdExtractor = (String url)->{
            Matcher matcher = pattern.matcher(url);
            Long teamId = matcher.matches() ? toLong(matcher.group(1), -1) : -1;
            return teamId;
        };

        productIdExtractor = (String url)->{
            Matcher matcher = pattern.matcher(url);
            Long productId = matcher.matches() ? toLong(matcher.group(2), -1) : -1;
            return productId;
        };

        this.requiresAuthorizationRequestMatcher = requiresAuthorizationRequestMatcher;
        this.teamService = teamService;
        this.productService = productService;

    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.isAssignableFrom(FilterInvocation.class);
    }

    @Override
    public int vote(Authentication authentication, FilterInvocation filter, Collection<ConfigAttribute> attributes) {
        HttpServletRequest request = filter.getRequest();

        // Target URL 아니면 통과
        if(!requiresAuthorization(request))return ACCESS_GRANTED;

        // Authorization Filter set Authenticate 클래스 체크
        if (!UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            return ACCESS_ABSTAIN;
        }


        // 접근 유저가 팀의 매니저인지 체크
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Long targetTeamId = obtainTeamId(request);

        Team team = teamService.getTeam(targetTeamId);


        if(request.getMethod().equals(HttpMethod.GET.name())){
            if(team.ifMember(principal.getUser()) || team.ifManager(principal.getUser())) return ACCESS_GRANTED;
        }

        // 프로덕트 체크 -> 해당 팀인지
        // 매니저가 아니면 예외
        if(!team.ifManager(principal.getUser())) return ACCESS_DENIED;

        return ACCESS_GRANTED;
    }

    private Long obtainTeamId(HttpServletRequest request) {
        return teamIdExtractor.apply(request.getRequestURI());
    }
    private Long obtainProductId(HttpServletRequest request) {
        return productIdExtractor.apply(request.getRequestURI());
    }

    private boolean requiresAuthorization(HttpServletRequest request) {
        return requiresAuthorizationRequestMatcher.matches(request);
    }
}
