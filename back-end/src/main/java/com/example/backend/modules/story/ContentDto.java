package com.example.backend.modules.story;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import java.io.Serializable;

@Data
@Builder
@DynamicInsert
public class ContentDto implements Serializable {
    private String content;

    public static ContentDto of(Content content) {
        return ContentDto.builder()
                .content(content.getContent())
                .build();
    }

    public static Content from(ContentDto contentDto){
        return Content.builder()
                .content(contentDto.getContent())
                .build();
    }

    @JsonCreator
    public ContentDto(@JsonProperty("content") String content) {
        this.content = content;
    }
}
