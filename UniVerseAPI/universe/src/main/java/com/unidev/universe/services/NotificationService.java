package com.unidev.universe.services;

import com.unidev.universe.entities.Notification;

import java.util.List;

public interface NotificationService {
    void addNotification(Notification notification);

    List<Notification> getUserNotifications(String username);

    void readNotifications(String username);
}
