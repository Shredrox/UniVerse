package com.unidev.universe.repository;

import com.unidev.universe.entities.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
@Transactional(readOnly=true)
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);

    void removeFriendByUsername(String loggedInUser, String profileUser);

    void addFriendByUsername(String loggedInUser, String profileUser);

    boolean checkFriendship(String usernameUser1, String usernameUser2);
}