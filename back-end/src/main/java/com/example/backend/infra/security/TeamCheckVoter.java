package com.example.backend.infra.security;

import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.team.Team;
import com.example.backend.modules.team.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
public class TeamCheckVoter implements AccessDecisionVoter<FilterInvocation> {
    private final RequestMatcher requiresAuthorizationRequestMatcher;
    private final Function<String, Long> idExtractor;

    private final TeamService teamService;

    @Autowired
    public TeamCheckVoter(TeamService teamService) {
//        final String regex = "^/api/team/(\\d+)/post/.*$";
        final String regex = "^/api/team/(\\d+)";
        final Pattern pattern = Pattern.compile(regex);
        RequestMatcher requiresAuthorizationRequestMatcher = new RegexRequestMatcher(pattern.pattern(), null);

        idExtractor = (String url)->{
            Matcher matcher = pattern.matcher(url);
            Long teamId = matcher.matches() ? toLong(matcher.group(1), -1) : -1;
            return teamId;
        };

        this.requiresAuthorizationRequestMatcher = requiresAuthorizationRequestMatcher;
        this.teamService = teamService;

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
        Long targetTeamId = obtainTargetId(request);

        Team team = teamService.getTeam(targetTeamId);

        // 매니저가 아니면 예외
        if(!team.ifManager(principal.getUser())) return ACCESS_DENIED;

        return ACCESS_GRANTED;
    }

    private Long obtainTargetId(HttpServletRequest request) {
        return idExtractor.apply(request.getRequestURI());
    }

    private boolean requiresAuthorization(HttpServletRequest request) {
        return requiresAuthorizationRequestMatcher.matches(request);
    }
}
