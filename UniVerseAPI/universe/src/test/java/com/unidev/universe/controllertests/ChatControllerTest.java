package com.unidev.universe.controllertests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unidev.universe.controllers.ChatController;
import com.unidev.universe.dto.ChatDTO;
import com.unidev.universe.dto.MessageDTO;
import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.entities.User;
import com.unidev.universe.responses.MessageResponse;
import com.unidev.universe.services.ChatService;
import com.unidev.universe.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChatController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChatService chatService;

    @MockBean
    private UserService userService;

    @MockBean
    private SimpMessagingTemplate simpMessagingTemplate;

    @Captor
    private ArgumentCaptor<ChatDTO> chatCaptor;

    @Autowired
    private ChatController chatController;

    @Test
    public void testGetMessages() throws Exception {
        String user = "user1";
        String chatUser = "user2";
        List<MessageResponse> mockResponses = new ArrayList<>();

        when(chatService.getChatMessages(any(User.class), any(User.class))).thenReturn(mockResponses);

        mockMvc.perform(get("/api/v1/chats/getMessages")
                        .param("user", user)
                        .param("chatUser", chatUser))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(mockResponses)));
    }
}
