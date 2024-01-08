package com.unidev.universe.controllers;

import com.unidev.universe.dto.PostDTO;
import com.unidev.universe.entities.Post;
import com.unidev.universe.responses.PostResponse;
import com.unidev.universe.services.FriendshipService;
import com.unidev.universe.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostController {
    private final PostService postService;
    private final FriendshipService friendshipService;

    @GetMapping
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/user/{username}/count")
    public ResponseEntity<Integer> getUserPostsCount(@PathVariable String username) {
        return ResponseEntity.ok(postService.getPostsByAuthorName(username).size());
    }

    @GetMapping("/getFriendsPosts/{username}")
    public List<PostResponse> getFriendsPosts(@PathVariable String username) {
        List<String> friends = friendshipService.getFriendUsernames(username);
        return postService.getPostsByAuthorNames(friends);
    }

    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId);
    }

    @GetMapping("/{postId}/image")
    public ResponseEntity<byte[]> getPostImage(@PathVariable Long postId) {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(postService.getPostImage(postId));
    }

    @PostMapping("/createPost")
    public ResponseEntity<byte[]> createPost(@ModelAttribute PostDTO post) throws IOException {
        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(createdPost.getImageData());
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post updatedPost) {
        Post result = postService.updatePost(postId, updatedPost);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
