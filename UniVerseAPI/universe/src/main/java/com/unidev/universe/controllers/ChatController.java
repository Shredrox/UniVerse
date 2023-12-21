package com.unidev.universe.controllers;

import com.unidev.universe.dto.ChatDTO;
import com.unidev.universe.dto.MessageDTO;
import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.services.ChatService;
import com.unidev.universe.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    private final UserService userService;

    @MessageMapping("/createChat")
    public void createChat(@Payload ChatDTO request){
        Chat newChat = new Chat();

        newChat.setUser1(userService.getUserByUsername(request.getUser1()));
        newChat.setUser2(userService.getUserByUsername(request.getUser2()));
        newChat.setCreatedAt(new Date());
        chatService.createChat(newChat);

        simpMessagingTemplate.convertAndSendToUser(newChat.getUser2().getUsername(), "/queue/chat", newChat);
    }

    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(@Payload MessageDTO request){
        Message newMessage = new Message();
        newMessage.setContent(request.getContent());
        newMessage.setSender(userService.getUserByUsername(request.getSender()));
        newMessage.setReceiver(userService.getUserByUsername(request.getReceiver()));
        newMessage.setTimestamp(new Date());
        chatService.saveMessage(newMessage);

        simpMessagingTemplate.convertAndSendToUser(newMessage.getReceiver().getUsername(), "/queue/message", newMessage);
    }

    @GetMapping("/api/getMessages")
    public List<Message> getMessages(@RequestParam("user") String user, @RequestParam("chatUser") String chatUser) {
        return chatService.getChatMessages(userService.getUserByUsername(user).getId(), userService.getUserByUsername(chatUser).getId());
    }

    @GetMapping("/api/getUserChats")
    public List<Chat> getUserChats(@RequestParam("user") String user) {
        return chatService.getUserChats(userService.getUserByUsername(user).getId());
    }
}
