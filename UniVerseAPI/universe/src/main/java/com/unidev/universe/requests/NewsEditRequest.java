package com.unidev.universe.requests;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsEditRequest {
    private Long id;
    private String title;
    private String content;
    private Boolean pinned;

    @Nullable
    private MultipartFile image;
}
