package com.unidev.universe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ChatMessage {
    private String sender;
    private String content;
    private String receiver;
    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date timestamp;
}
