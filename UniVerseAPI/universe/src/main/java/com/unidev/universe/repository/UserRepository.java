package com.unidev.universe.repository;

import com.unidev.universe.entities.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
@Transactional(readOnly=true)
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    boolean existsByUsername(String username);
}