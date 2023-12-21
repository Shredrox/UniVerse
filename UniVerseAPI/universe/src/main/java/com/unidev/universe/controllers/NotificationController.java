package com.unidev.universe.controllers;

import com.unidev.universe.entities.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
@RequiredArgsConstructor
public class NotificationController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendNotification")
    @SendTo("/topic/publicNotification")
    public Notification sendNotification(@Payload Notification notification){
        notification.setRead(false);
        notification.setTimestamp(new Date());
        return notification;
    }

    @MessageMapping("/sendUserNotification")
    public void sendUserNotification(@Payload Notification notification){
        notification.setRead(false);
        notification.setTimestamp(new Date());

        simpMessagingTemplate.convertAndSendToUser(notification.getRecipientName(), "/queue/notification", notification);
    }
}

