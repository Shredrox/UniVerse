package com.unidev.universe.repository;

import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);

    void removeFriendByUsername(String loggedInUser, String profileUser);

    void addFriendByUsername(String loggedInUser, String profileUser);

    boolean checkFriendship(String usernameUser1, String usernameUser2);
}