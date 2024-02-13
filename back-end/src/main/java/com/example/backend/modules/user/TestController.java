package com.example.backend.modules.user;

import com.aspose.words.Document;
import com.aspose.words.DocumentBuilder;
import com.example.backend.infra.security.JwtUtil;
import com.example.backend.modules.api.ApiResult;
import com.example.backend.modules.auth.GeneratedToken;
import com.example.backend.modules.auth.principal.PrincipalDetails;
import com.example.backend.modules.exception.NotFoundException;
import com.example.backend.modules.product.Product;
import com.example.backend.modules.product.ProductRepository;
import com.example.backend.modules.product.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Controller
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;
    @Value("${redirectUrl}")
    private String redirectUrl;

    private final ProductRepository productRepository;
    private final ProductService productService;

    @GetMapping
    public void getTest(@RequestParam String username,  HttpServletResponse response) throws IOException {

        User user = userRepository.findWithAuthoritiesByUsername(username).orElseThrow(()-> new NotFoundException());

        GeneratedToken token =
                jwtUtil.generateToken(
                        user.getUsername(),
                        objectMapper.writeValueAsString(user.getAuthorities())
                );

        // 쿠키 설정
        ResponseCookie accessCookie = ResponseCookie.from("accessToken", URLEncoder.encode(token.getAccessToken(), "UTF-8"))
                .httpOnly(false)
                .secure(true)
                .path("/")      // path
                .maxAge(Duration.ofDays(1))
                .sameSite("None")  // sameSite
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

//        response.sendRedirect(UriComponentsBuilder.fromUriString("http://localhost:5173/app/workspace")
        response.sendRedirect(UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }

    @GetMapping("/word")
    public ResponseEntity<byte[]> generateWord() {
        try {
            // 빈 워드 문서 생성
            Document doc = new Document();

            DocumentBuilder builder = new DocumentBuilder(doc);
            builder.write("hello world");
            // 워드 문서를 바이트 배열로 저장
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            doc.save(outputStream, com.aspose.words.SaveFormat.DOCX);

            // HTTP 응답 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("filename", "generated_document.docx");

            // 바이트 배열을 HTTP 응답 본문으로 설정하여 반환
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test-word")
    public ResponseEntity<byte[]> generateWordFile() {
        try {

            Product product = productRepository.findById(9L).orElseThrow(()-> new NotFoundException());
            StringBuffer sf = productService.findWithStoryContentByProductId(9L);

            // 빈 워드 문서 생성
            Document doc = new Document();

            DocumentBuilder builder = new DocumentBuilder(doc);
            builder.write(sf.toString());
            // 워드 문서를 바이트 배열로 저장
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            doc.save(outputStream, com.aspose.words.SaveFormat.DOCX);

            // HTTP 응답 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            headers.setContentDispositionFormData("filename", "product");

            // 바이트 배열을 HTTP 응답 본문으로 설정하여 반환
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
