import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3 s3;
    @Value("${s3.url}")
    private String s3URL;

    @Value("${s3.bucket}")
    private String bucketName;
    private final String folderName = "images";


    // S3 업로드 및 url 반환
    private String putS3AndReturnURL(File uploadFile) {
        String uuid = UUID.randomUUID().toString();
        String fileName = folderName + "/" + uuid + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    // null 체크, 이미지 타입 체크
    public boolean verify(MultipartFile multipartFile) {
        if (multipartFile != null && multipartFile.getSize() > 0 && multipartFile.getOriginalFilename() != null) {
            String contentType = multipartFile.getContentType();
            return (contentType != null) && contentType.toLowerCase().startsWith("image");
        }
        return false;
    }

    // s3 버킷 put
    private String putS3(File uploadFile, String fileName) {
        s3.putObject(
                new PutObjectRequest(bucketName, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)    // PublicRead 권한 업로드
        );
        return s3URL + "/" + fileName;
    }


    // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성)
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }
}