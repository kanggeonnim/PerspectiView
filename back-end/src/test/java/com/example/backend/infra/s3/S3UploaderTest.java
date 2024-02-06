package com.example.backend.infra.s3;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class S3UploaderTest {
    @Autowired
    private S3Uploader s3Uploader;

    @Test
    @DisplayName("text contentType fail")
    public void testS3Test(){
        MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt", "text/plain", "test file".getBytes(StandardCharsets.UTF_8) );
        assertThatThrownBy(()-> s3Uploader.upload(multipartFile))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("not image");
    }

    @Test
    @DisplayName("image contentType success")
    public void testS3Image() throws IOException {
        byte[] content = new byte[1024];
        MockMultipartFile multipartFile = new MockMultipartFile("image", "image.jpg", MediaType.IMAGE_JPEG_VALUE, content);

        Optional<String> returnUrl = s3Uploader.upload(multipartFile);
        assertNotNull(returnUrl.get());
    }

}