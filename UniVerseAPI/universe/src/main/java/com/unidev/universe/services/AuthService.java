package com.unidev.universe.services;

import com.unidev.universe.entities.User;
import com.unidev.universe.entities.UserRole;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.requests.LoginRequest;
import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.responses.JwtResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public User register(RegisterRequest registerRequest){
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setUserRole(UserRole.USER);

        return userRepository.save(user);
    }

    public JwtResponse login(LoginRequest loginRequest, HttpServletResponse response){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        User user = userService.getUserByEmail(loginRequest.getEmail());
        String accessToken = jwtService.generateToken(user.getUsername());
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user.getUsername());

        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(60 * 15);

        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60 * 60 * 24);

        response.addCookie(refreshTokenCookie);

        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setAccessToken(accessToken);
        jwtResponse.setRefreshToken(refreshToken);
        jwtResponse.setUsername(user.getName());

        return jwtResponse;
    }

    public JwtResponse refreshToken(HttpServletRequest request, HttpServletResponse response){
        String accessToken = null;

        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("accessToken")){
                accessToken = cookie.getValue();
            }
        }

        String email = jwtService.extractUser(accessToken);
        User user = userRepository.findByEmail(email);

        if(jwtService.validateToken(accessToken, user)){
            String newAccessToken = jwtService.generateToken(user.getUsername());
            String newRefreshToken = jwtService.generateRefreshToken(new HashMap<>(), user.getUsername());

            Cookie accessTokenCookie = new Cookie("accessToken", newAccessToken);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setSecure(true);
            accessTokenCookie.setPath("/");
            accessTokenCookie.setMaxAge(60 * 15);

            response.addCookie(accessTokenCookie);

            Cookie refreshTokenCookie = new Cookie("refreshToken", newRefreshToken);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(true);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(60 * 60 * 24);

            response.addCookie(refreshTokenCookie);

            JwtResponse jwtResponse = new JwtResponse();
            jwtResponse.setAccessToken(newAccessToken);
            jwtResponse.setRefreshToken(newRefreshToken);

            return jwtResponse;
        }

        return null;
    }
}
