package com.unidev.universe.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private byte[] imageData;
    private String authorName;
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    LocalDateTime timestamp;
}
