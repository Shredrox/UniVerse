package com.unidev.universe.services;

import com.unidev.universe.entities.User;
import com.unidev.universe.requests.LoginRequest;
import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.responses.JwtResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService{

    User register(RegisterRequest registerRequest);

    JwtResponse login(LoginRequest loginRequest, HttpServletResponse response);

    void logout(HttpServletRequest request, HttpServletResponse response);

    JwtResponse refreshToken(HttpServletRequest request, HttpServletResponse response);

    boolean getUserByInfo(RegisterRequest request);
}
