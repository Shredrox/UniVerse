package com.unidev.universe.repository;

import com.unidev.universe.entities.Comment;
import com.unidev.universe.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findById(int commentId);
}