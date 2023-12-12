package com.unidev.universe.repository;

import com.unidev.universe.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Post findById(int postId);
}