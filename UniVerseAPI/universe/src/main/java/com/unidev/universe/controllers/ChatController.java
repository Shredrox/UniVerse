package com.unidev.universe.controllers;

import com.unidev.universe.dto.ChatDTO;
import com.unidev.universe.dto.MessageDTO;
import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.entities.User;
import com.unidev.universe.responses.MessageResponse;
import com.unidev.universe.services.ChatService;
import com.unidev.universe.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chats")
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    private final UserService userService;

    @MessageMapping("/createChat")
    public void createChat(@Payload ChatDTO request){
        Chat newChat = new Chat();

        newChat.setUser1(userService.getUserByUsername(request.getUser1()));
        newChat.setUser2(userService.getUserByUsername(request.getUser2()));
        newChat.setCreatedAt(LocalDateTime.now());
        chatService.createChat(newChat);

        simpMessagingTemplate.convertAndSendToUser(newChat.getUser2().getName(), "/queue/chat", newChat);
    }

    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(@Payload MessageDTO request){
        User sender = userService.getUserByUsername(request.getSender());
        User receiver = userService.getUserByUsername(request.getReceiver());

        Chat chat = chatService.getChat(sender, receiver);

        Message newMessage = new Message();
        newMessage.setContent(request.getContent());
        newMessage.setSender(sender);
        newMessage.setReceiver(receiver);
        newMessage.setTimestamp(LocalDateTime.now());
        newMessage.setChat(chat);

        chatService.saveMessage(newMessage);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setContent(newMessage.getContent());
        messageResponse.setSender(newMessage.getSender().getName());
        messageResponse.setReceiver(newMessage.getSender().getName());
        messageResponse.setTimestamp(newMessage.getTimestamp());

        simpMessagingTemplate.convertAndSendToUser(newMessage.getReceiver().getName(), "/queue/message", messageResponse);
    }

    @GetMapping("/getMessages")
    public List<MessageResponse> getMessages(@RequestParam("user") String user, @RequestParam("chatUser") String chatUser) {
        return chatService.getChatMessages(userService.getUserByUsername(user), userService.getUserByUsername(chatUser));
    }

    @GetMapping("/getUserChats")
    public List<ChatDTO> getUserChats(@RequestParam("user") String user) {
        return chatService.getUserChats(userService.getUserByUsername(user).getId());
    }
}
