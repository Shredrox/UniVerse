package com.unidev.universe.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Notification {
    private String message;
    private String type;
    private String source;
    private String recipientName;
    private boolean isRead;
    private Date timestamp;
}

