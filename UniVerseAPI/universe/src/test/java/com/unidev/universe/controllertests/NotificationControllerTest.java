package com.unidev.universe.controllertests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unidev.universe.controllers.NotificationController;
import com.unidev.universe.entities.Notification;
import com.unidev.universe.services.NotificationService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NotificationController.class)
@AutoConfigureMockMvc(addFilters = false)
public class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationService notificationService;

    @MockBean
    private SimpMessagingTemplate simpMessagingTemplate;

    @Test
    public void testGetUserNotifications() throws Exception {
        String username = "testUser";
        List<Notification> notifications = Arrays.asList(
                new Notification(/* initialize with test data */),
                new Notification(/* initialize with test data */)
        );
        when(notificationService.getUserNotifications(username)).thenReturn(notifications);

        mockMvc.perform(get("/api/v1/notifications/" + username))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(notifications)));
    }

    @Test
    public void testReadNotifications() throws Exception {
        String username = "testUser";

        mockMvc.perform(post("/api/v1/notifications/" + username + "/set-read"))
                .andExpect(status().isOk());

        verify(notificationService, times(1)).readNotifications(username);
    }
}