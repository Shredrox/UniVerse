package com.unidev.universe.controllers;

import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.requests.UpdateProfileRequest;
import com.unidev.universe.responses.UserResponse;
import com.unidev.universe.services.AuthService;
import com.unidev.universe.services.UserService;
import com.unidev.universe.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search/{filter}")
    public ResponseEntity<List<UserResponse>> getUsersByFilter(@PathVariable String filter) {
        return ResponseEntity.ok(userService.getUsersByFilter(filter));
    }

    @GetMapping("/exists/{username}")
    public ResponseEntity<Boolean> userExists(@PathVariable String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUserByName(@PathVariable String username) {
        User user = userService.getUserByUsername(username);

        if(user == null){
            return ResponseEntity.notFound().build();
        }

        UserResponse response = new UserResponse();
        response.setUsername(user.getName());
        response.setEmail(user.getEmail());

        return new ResponseEntity<UserResponse>(response, HttpStatus.OK);
    }

    @GetMapping("/{username}/profile-picture")
    public ResponseEntity<byte[]> getUserProfilePicture(@PathVariable String username) throws IOException {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(userService.getUserProfilePictureImage(username));
    }

    @PostMapping("/confirm-password")
    public ResponseEntity<Boolean> confirmPassword(@RequestBody RegisterRequest request) {
        boolean result = authService.getUserByInfo(request);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@ModelAttribute UpdateProfileRequest request) throws IOException {
        boolean result = userService.updateProfile(request);

        if(!result){
            ResponseEntity.badRequest();
        }

        return ResponseEntity.ok("Profile updated.");
    }
}