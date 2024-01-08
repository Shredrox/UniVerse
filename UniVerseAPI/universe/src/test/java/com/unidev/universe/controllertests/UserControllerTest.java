package com.unidev.universe.controllertests;

import com.unidev.universe.controllers.UserController;
import com.unidev.universe.requests.RegisterRequest;
import com.unidev.universe.requests.UpdateProfileRequest;
import com.unidev.universe.responses.UserResponse;
import com.unidev.universe.services.AuthService;
import com.unidev.universe.services.UserService;
import com.unidev.universe.entities.User;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private AuthService authService;

    @InjectMocks
    private UserController userController;

    @Test
    void testGetAllUsers() {
        // Mocking the behavior of the userService
        List<User> mockUserList = Collections.singletonList(new User());
        when(userService.getAllUsers()).thenReturn(mockUserList);

        // Calling the controller method
        ResponseEntity<List<User>> result = userController.getAllUsers();

        // Verifying the result
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(mockUserList, result.getBody());
    }

    @Test
    void testGetUsersByFilter() {
        // Mocking the behavior of the userService
        List<UserResponse> mockUserResponseList = Collections.singletonList(new UserResponse());
        when(userService.getUsersByFilter(anyString())).thenReturn(mockUserResponseList);

        // Calling the controller method
        ResponseEntity<List<UserResponse>> result = userController.getUsersByFilter("filter");

        // Verifying the result
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(mockUserResponseList, result.getBody());
        // Verifying that the userService method was called with the correct parameter
        verify(userService, times(1)).getUsersByFilter("filter");
    }

    // Similarly, you can write tests for other methods like userExists, getUserByName, getUserProfilePicture, confirmPassword, and updateProfile.
    // Make sure to mock the userService and authService appropriately and verify the interactions.

    // Example test for userExists
    @Test
    void testUserExists() {
        // Mocking the behavior of the userService
        when(userService.existsByUsername(anyString())).thenReturn(true);

        // Calling the controller method
        ResponseEntity<Boolean> result = userController.userExists("username");

        // Verifying the result
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertTrue(result.getBody());
        // Verifying that the userService method was called with the correct parameter
        verify(userService, times(1)).existsByUsername("username");
    }

    // Similar tests can be written for other methods.

    // Note: These tests use Mockito to mock the UserService and AuthService. Ensure that you have the Mockito dependency added to your project.
}
