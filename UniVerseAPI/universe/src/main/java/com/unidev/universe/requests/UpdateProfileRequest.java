package com.unidev.universe.requests;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateProfileRequest {
    private String username;
    private String newUsername;
    private String newEmail;
    private String newPassword;

    @Nullable
    private MultipartFile profilePicture;
}
