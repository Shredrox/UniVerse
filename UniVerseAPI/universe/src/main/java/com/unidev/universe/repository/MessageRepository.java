package com.unidev.universe.repository;

import com.unidev.universe.entities.Message;
import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderOrReceiverAndSenderOrReceiver(User sender, User receiver, User receiver1, User sender1);
}
