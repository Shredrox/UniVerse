package com.unidev.universe.controllers;

import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        chatMessage.setTimestamp(new Date());
        return chatMessage;
    }

    @MessageMapping("/createChat")
    public void createChat(@Payload Chat request){
        //Save chat in database here

        simpMessagingTemplate.convertAndSendToUser(request.getUser2().getUsername(), "/queue/chat", request);
    }

    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage){
        chatMessage.setTimestamp(new Date());

        //Save message in database here

        simpMessagingTemplate.convertAndSendToUser(chatMessage.getReceiver(), "/queue/message", chatMessage);
    }

    @GetMapping("/api/getMessages")
    public List<ChatMessage> getMessages(@RequestParam("user") String user,
                                         @RequestParam("chatUser") String chatUser) {

        //Get messages from database
        List<ChatMessage> filteredMessages = new ArrayList<>();

        return filteredMessages;
    }

    @GetMapping("/api/getUserChats")
    public List<Chat> getUserChats(@RequestParam("user") String user) {

        //Get user chats from database
        List<Chat> userChats = new ArrayList<>();

        return userChats;
    }
}
