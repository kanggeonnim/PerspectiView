import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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


    // null 체크, 이미지 타입 체크
    public boolean verify(MultipartFile multipartFile){
        if(multipartFile != null && multipartFile.getSize() > 0 && multipartFile.getOriginalFilename() != null){
            String contentType = multipartFile.getContentType();
            return (contentType != null) && contentType.toLowerCase().startsWith("image");
        }
        return false;
    }

}