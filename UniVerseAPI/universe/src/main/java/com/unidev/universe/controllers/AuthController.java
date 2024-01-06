package com.unidev.universe.controllers;

import com.unidev.universe.entities.User;
import com.unidev.universe.requests.LoginRequest;
import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.responses.JwtResponse;
import com.unidev.universe.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        return ResponseEntity.ok(authService.login(loginRequest, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
        authService.logout(request, response);

        return ResponseEntity.ok("User logged out.");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.refreshToken(request, response));
    }
}
