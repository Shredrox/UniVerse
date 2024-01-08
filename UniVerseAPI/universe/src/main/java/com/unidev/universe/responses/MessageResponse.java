package com.unidev.universe.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MessageResponse {
    String content;
    String sender;
    String receiver;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    LocalDateTime timestamp;
}
