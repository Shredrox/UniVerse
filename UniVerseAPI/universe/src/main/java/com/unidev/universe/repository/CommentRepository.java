package com.unidev.universe.repository;

import com.unidev.universe.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<List<Comment>> findByPostId(long postId);
    Optional<List<Comment>> findByPostIdAndParentCommentIsNull(long postId);
    Optional<List<Comment>> findAllByParentCommentId(long parentCommentId);
    void deleteAllByPostId(long postId);
}