package com.unidev.universe.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostDTO {
    private String title;
    private String content;
    private String authorName;
    private MultipartFile image;
}
