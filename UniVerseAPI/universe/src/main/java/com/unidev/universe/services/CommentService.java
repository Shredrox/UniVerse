package com.unidev.universe.services;
import com.unidev.universe.dto.CommentDTO;
import com.unidev.universe.entities.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getAllComments();

    Comment getCommentById(Long commentId);

    List<Comment> getPostComments(Long postId);

    int getPostCommentsCount(Long postId);

    List<Comment> getCommentReplies(Long parentCommentId);

    Comment createComment(CommentDTO request);

    Comment addReply(Long commendId, CommentDTO request);

    Comment updateComment(Long commentId, Comment updatedComment);

    void deleteComment(Long commentId);
}
