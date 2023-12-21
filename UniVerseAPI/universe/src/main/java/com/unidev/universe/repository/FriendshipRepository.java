package com.unidev.universe.repository;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    boolean existsByUser1AndUser2(User user1, User user2);
    void deleteByUser1AndUser2(User user1, User user2);
}
