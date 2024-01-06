package com.unidev.universe.repository;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.FriendshipStatus;
import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    void deleteByUser1AndUser2OrUser1AndUser2(User user1, User user2, User user22, User user11);
    List<Friendship> findAllByUser1OrUser2(User user1, User user2);
    Friendship findByUser1AndUser2OrUser1AndUser2(User user1, User user2, User user22, User user11);
    List<Friendship> findAllByUser2AndStatus(User user2, FriendshipStatus status);
}
