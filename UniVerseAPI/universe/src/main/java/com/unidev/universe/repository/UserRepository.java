package com.unidev.universe.repository;

import com.unidev.universe.entities.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional(readOnly=true)
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    List<User> findAllByUsername(String username);

    List<User> findByUsernameIn(List<String> usernames);

    boolean existsByUsername(String username);
}