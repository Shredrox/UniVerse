package com.unidev.universe.services;
import com.unidev.universe.dto.CommentDTO;
import com.unidev.universe.entities.Post;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.PostRepository;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.unidev.universe.entities.Comment;
import com.unidev.universe.repository.CommentRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElse(null);
    }

    public List<Comment> getPostComments(Long postId) {
        Optional<List<Comment>> postComments = commentRepository.findByPostId(postId);
        return postComments.orElse(null);
    }

    public List<Comment> getCommentReplies(Long parentCommentId) {
        Optional<List<Comment>> postComments = commentRepository.findAllByParentCommentId(parentCommentId);
        return postComments.orElse(null);
    }

    public Comment createComment(CommentDTO request) {
        Post post = postRepository.findById(request.getPostId());
        User user = userRepository.findByUsername(request.getUsername());

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    public Comment addReply(Long commendId, CommentDTO request) {
        Post post = postRepository.findById(request.getPostId());
        User user = userRepository.findByUsername(request.getUsername());
        Optional<Comment> parentComment = commentRepository.findById(commendId);

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);
        comment.setParentComment(parentComment.orElse(null));

        return commentRepository.save(comment);
    }

    public Comment updateComment(Long commentId, Comment updatedComment) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isPresent()) {
            Comment existingComment = optionalComment.get();
            existingComment.setContent(updatedComment.getContent());
            return commentRepository.save(existingComment);
        } else {
            return null;
        }
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
