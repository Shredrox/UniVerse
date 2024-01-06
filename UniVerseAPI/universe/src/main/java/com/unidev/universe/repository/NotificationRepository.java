package com.unidev.universe.repository;

import com.unidev.universe.entities.Notification;
import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUser(User user);
}
