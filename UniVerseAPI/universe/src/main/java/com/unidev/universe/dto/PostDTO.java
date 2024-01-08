package com.unidev.universe.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostDTO {
    private String title;
    private String content;
    private String authorName;

    @Nullable
    private MultipartFile image;
}
