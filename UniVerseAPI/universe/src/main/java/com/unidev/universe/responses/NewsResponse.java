package com.unidev.universe.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsResponse {
    private Long id;
    private String title;
    private String content;
    boolean pinned;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    private LocalDateTime date;
}
