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

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Integer> getPostLikes(@PathVariable int postId) {
        int likesCount = likeService.getPostLikes(postId);
        return ResponseEntity.ok(likesCount);
    }

    @GetMapping("/posts/{postId}/likedBy/{username}")
    public ResponseEntity<Boolean> getIsLiked(@PathVariable int postId, @PathVariable String username) {
        boolean isLiked = likeService.isPostLiked(postId, username);
        return ResponseEntity.ok(isLiked);
    }

    @PostMapping("/posts/{postId}/like/{username}")
    public ResponseEntity<String> likePost(@PathVariable int postId, @PathVariable String username) {
        likeService.likePost(postId, username);
        return ResponseEntity.ok("Post liked successfully.");
    }

    @PostMapping("/posts/{postId}/unlike/{username}")
    public ResponseEntity<String> unlikePost(@PathVariable int postId, @PathVariable String username) {
        likeService.unlikePost(postId, username);
        return ResponseEntity.ok("Post unliked successfully.");
    }
}
