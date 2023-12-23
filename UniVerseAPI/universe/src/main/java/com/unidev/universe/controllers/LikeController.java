package com.unidev.universe.controllers;

import com.unidev.universe.services.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class LikeController {

    private final LikeService likeService;

    @GetMapping("/post/{postId}/getLikes")
    public ResponseEntity<Integer> getPostLikes(@PathVariable long postId) {
        int likesCount = likeService.getPostLikes(postId);
        return ResponseEntity.ok(likesCount);
    }

    @GetMapping("/post/{postId}/likedBy/{username}")
    public ResponseEntity<Boolean> getIsLiked(@PathVariable long postId, @PathVariable String username) {
        boolean isLiked = likeService.isPostLiked(postId, username);
        return ResponseEntity.ok(isLiked);
    }

    @PostMapping("/post/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable long postId, @RequestParam String username) {
        likeService.likePost(postId, username);
        return ResponseEntity.ok("Post liked successfully.");
    }

    @PostMapping("/post/{postId}/unlike")
    public ResponseEntity<String> unlikePost(@PathVariable long postId, @RequestParam String username) {
        likeService.unlikePost(postId, username);
        return ResponseEntity.ok("Post unliked successfully.");
    }
}
