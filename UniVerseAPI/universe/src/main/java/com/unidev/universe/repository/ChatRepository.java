package com.unidev.universe.repository;

import com.unidev.universe.entities.Chat;
import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByUser1IdOrUser2Id(long user1Id, long user2Id);
    Chat findByUser1AndUser2OrUser1AndUser2(User user1, User user2, User user22, User user11);
}
