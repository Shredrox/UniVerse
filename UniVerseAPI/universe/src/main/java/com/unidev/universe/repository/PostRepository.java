package com.unidev.universe.repository;

import com.unidev.universe.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    Post findById(long postId);
    List<Post> findByAuthorNameIn(List<String> usernames);
}