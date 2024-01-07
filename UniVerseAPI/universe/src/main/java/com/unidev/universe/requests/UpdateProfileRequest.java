package com.unidev.universe.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequest {
    private String username;
    private String newUsername;
    private String newEmail;
    private String newPassword;
    private MultipartFile profilePicture;
}
