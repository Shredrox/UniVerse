package com.unidev.universe.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsDTO {
    private String title;
    private String content;
    private Boolean pinned;

    @Nullable
    private MultipartFile image;
}
