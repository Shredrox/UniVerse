package com.unidev.universe.controllertests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unidev.universe.controllers.AuthController;
import com.unidev.universe.entities.User;
import com.unidev.universe.entities.UserRole;
import com.unidev.universe.requests.LoginRequest;
import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.responses.JwtResponse;
import com.unidev.universe.services.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Test
    public void testRegisterUser() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("user", "email@example.com", "password");
        User mockUser = new User("user", "email@example.com", "encryptedPassword", UserRole.USER);

        when(authService.register(any(RegisterRequest.class))).thenReturn(mockUser);

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(mockUser.getUsername()))
                .andExpect(jsonPath("$.email").value(mockUser.getEmail()));
    }

    @Test
    public void testLoginUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest("email@example.com", "password");
        JwtResponse jwtResponse = new JwtResponse("accessToken", "refreshToken", "user", "USER");

        when(authService.login(any(LoginRequest.class), any())).thenReturn(jwtResponse);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value(jwtResponse.getAccessToken()))
                .andExpect(jsonPath("$.refreshToken").value(jwtResponse.getRefreshToken()));
    }

    @Test
    public void testLogoutUser() throws Exception {
        mockMvc.perform(post("/api/v1/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(content().string("User logged out."));
    }

    @Test
    public void testRefreshToken() throws Exception {
        JwtResponse jwtResponse = new JwtResponse("newAccessToken", "newRefreshToken", "user", "USER");

        when(authService.refreshToken(any(), any())).thenReturn(jwtResponse);

        mockMvc.perform(post("/api/v1/auth/refresh-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value(jwtResponse.getAccessToken()))
                .andExpect(jsonPath("$.refreshToken").value(jwtResponse.getRefreshToken()));
    }
}
