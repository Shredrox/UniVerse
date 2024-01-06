package com.unidev.universe.requests;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String username;
    private String newUsername;
    private String newEmail;
    private String newPassword;
}
