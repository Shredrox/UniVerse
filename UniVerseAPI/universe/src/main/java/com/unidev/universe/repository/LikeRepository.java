package com.unidev.universe.repository;

import com.unidev.universe.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    int countByPostId(long postId);

    boolean existsByPostIdAndUsername(long postId, String username);

    boolean deleteByPostIdAndUsername(long postId, String username);

    void saveLike(int postId, String username);
}
