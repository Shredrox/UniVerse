package com.unidev.universe.controllers;
import com.unidev.universe.dto.CommentDTO;
import com.unidev.universe.services.CommentService;
//import com.unidev.universe.authentication.JwtUtil;
import com.unidev.universe.entities.Comment;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{commentId}")
    public Comment getCommentById(@PathVariable Long commentId) {
        return commentService.getCommentById(commentId);
    }

    @GetMapping("/{postId}/getComments")
    public List<Comment> getPostComments(@PathVariable Long postId) {
        return commentService.getPostComments(postId);
    }

    @GetMapping("/{postId}/getCommentsCount")
    public int getPostCommentsCount(@PathVariable Long postId) {
        return commentService.getPostComments(postId).size();
    }

    @GetMapping("/{commentId}/replies")
    public List<Comment> getCommentReplies(@PathVariable Long commentId) {
        return commentService.getCommentReplies(commentId);
    }

    @PostMapping("/addComment")
    public Comment createComment(@RequestBody CommentDTO request) {
        return commentService.createComment(request);
    }

    @PostMapping("/{commentId}/addReply")
    public Comment addReply(@PathVariable Long commentId, @RequestBody CommentDTO request) {
        return commentService.addReply(commentId, request);
    }

    @PutMapping("/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment) {
        return commentService.updateComment(commentId, updatedComment);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }
}
