package com.unidev.universe.controllers;

import com.unidev.universe.entities.Notification;
import com.unidev.universe.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NotificationService notificationService;

    @MessageMapping("/sendNotification")
    @SendTo("/topic/publicNotification")
    public Notification sendNotification(@Payload Notification notification){
        notification.setRead(false);
        notification.setTimestamp(LocalDateTime.now());
        return notification;
    }

    @MessageMapping("/sendUserNotification")
    public void sendUserNotification(@Payload Notification notification){
        notification.setRead(false);
        notification.setTimestamp(LocalDateTime.now());

        notificationService.addNotification(notification);

        simpMessagingTemplate.convertAndSendToUser(notification.getRecipientName(), "/queue/notification", notification);
    }

    @GetMapping("/{username}")
    public List<Notification> getUserNotifications(@PathVariable String username) {
        return notificationService.getUserNotifications(username);
    }

    @PostMapping("/{username}/set-read")
    public void readNotifications(@PathVariable String username){
        notificationService.readNotifications(username);
    }
}

