package com.unidev.universe.services;

import com.unidev.universe.dto.ChatDTO;
import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.entities.User;
import com.unidev.universe.responses.MessageResponse;

import java.util.List;

public interface ChatService {
    void createChat(Chat newChat);

    void saveMessage(Message message);

    Chat getChat(User user1, User user2);

    List<MessageResponse> getChatMessages(User user1, User user2);

    List<ChatDTO> getUserChats(long userId);
}
