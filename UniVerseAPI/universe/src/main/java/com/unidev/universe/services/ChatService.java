package com.unidev.universe.services;

import com.unidev.universe.dto.ChatDTO;
import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.Message;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.ChatRepository;
import com.unidev.universe.repository.MessageRepository;
import com.unidev.universe.responses.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Chat getChat(User user1, User user2){
        return chatRepository.findByUser1AndUser2OrUser1AndUser2(user1, user2, user2, user1);
    }

    public List<MessageResponse> getChatMessages(User user1, User user2){
        List<Message> chatMessages = messageRepository.findBySenderOrReceiverAndSenderOrReceiver(user1, user2, user2, user1);
        List<MessageResponse> chatMessagesResponse = new ArrayList<>();

        for (Message message: chatMessages) {
            MessageResponse messageResponse = new MessageResponse();
            messageResponse.setContent(message.getContent());
            messageResponse.setSender(message.getSender().getName());
            messageResponse.setReceiver(message.getReceiver().getName());
            messageResponse.setTimestamp(message.getTimestamp());

            chatMessagesResponse.add(messageResponse);
        }

        return chatMessagesResponse;
    }

    public List<ChatDTO> getUserChats(long userId){
        List<Chat> userChats = chatRepository.findByUser1IdOrUser2Id(userId, userId);

        List<ChatDTO> chatsResponse = new ArrayList<>();
        for (Chat chat : userChats) {
            ChatDTO chatDTO = new ChatDTO();
            chatDTO.setUser1(chat.getUser1().getName());
            chatDTO.setUser2(chat.getUser2().getName());

            chatsResponse.add(chatDTO);
        }

        return chatsResponse;
    }
}
