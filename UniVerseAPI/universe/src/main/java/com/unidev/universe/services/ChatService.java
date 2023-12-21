package com.unidev.universe.services;

import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.repository.ChatRepository;
import com.unidev.universe.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public void createChat(Chat newChat) {
        chatRepository.save(newChat);
    }

    public void saveMessage(Message message){
        messageRepository.save(message);
    }

    public List<Message> getChatMessages(long user1Id, long user2Id){
       return messageRepository.findBySenderIdOrReceiverId(user1Id, user2Id);
    }

    public List<Chat> getUserChats(long userId){
        return chatRepository.findByUser1IdOrUser2Id(userId, userId);
    }
}
