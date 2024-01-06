package com.unidev.universe.services;

import com.unidev.universe.entities.Notification;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.NotificationRepository;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void addNotification(Notification notification){
        User user = userRepository.findByUsername(notification.getRecipientName());
        notification.setUser(user);

        notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(String username){
        User user = userRepository.findByUsername(username);

        return notificationRepository.findAllByUser(user);
    }

    public void readNotifications(String username){
        User user = userRepository.findByUsername(username);

        List<Notification> userNotifications = notificationRepository.findAllByUser(user);

        for (Notification notification: userNotifications) {
            notification.setRead(true);
        }

        notificationRepository.saveAll(userNotifications);
    }
}
