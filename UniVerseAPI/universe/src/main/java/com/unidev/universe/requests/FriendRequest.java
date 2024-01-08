package com.unidev.universe.requests;

import lombok.Data;

@Data
public class FriendRequest {
    private String sender;
    private String receiver;
}
