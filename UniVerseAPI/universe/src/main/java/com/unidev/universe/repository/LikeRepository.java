package com.unidev.universe.repository;

import com.unidev.universe.entities.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPostId(long postId);
    List<Like> findByPostIdAndUserId(long postId, long userId);
    boolean existsByPostIdAndUserId(long postId, long userId);
    void deleteByPostIdAndUserId(long postId, long userId);
    void deleteAllByPostId(long postId);
}
