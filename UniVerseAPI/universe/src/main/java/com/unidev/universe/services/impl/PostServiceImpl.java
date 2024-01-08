package com.unidev.universe.services.impl;

import com.unidev.universe.dto.PostDTO;
import com.unidev.universe.entities.Post;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.PostRepository;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.responses.PostResponse;
import com.unidev.universe.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<PostResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostResponse> allPostsResponse = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getId());
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(post.getContent());
            postResponse.setTimestamp(post.getTimestamp());
            postResponse.setAuthorName(post.getAuthorName());
            postResponse.setImageData(post.getImageData());

            allPostsResponse.add(postResponse);
        }

        return allPostsResponse;
    }

    public Post getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    public List<PostResponse> getPostsByAuthorNames(List<String> authorNames) {
        List<Post> userPosts = postRepository.findAllByAuthorNameIn(authorNames);
        List<PostResponse> userPostsResponse = new ArrayList<>();

        for (Post post: userPosts) {
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getId());
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(post.getContent());
            postResponse.setTimestamp(post.getTimestamp());
            postResponse.setAuthorName(post.getAuthorName());
            postResponse.setImageData(post.getImageData());

            userPostsResponse.add(postResponse);
        }

        return userPostsResponse;
    }

    public List<Post> getPostsByAuthorName(String authorName) {
        return postRepository.findAllByAuthorName(authorName);
    }

    public byte[] getPostImage(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        return post.orElseThrow().getImageData();
    }

    public Post createPost(PostDTO request) throws IOException {
        User user = userRepository.findByUsername(request.getAuthorName());

        Post newPost = new Post();
        newPost.setTitle(request.getTitle());
        newPost.setContent(request.getContent());
        newPost.setImageData(request.getImage().getBytes());
        newPost.setTimestamp(LocalDateTime.now());
        newPost.setAuthorName(user.getName());
        newPost.setUser(user);

        return postRepository.save(newPost);
    }

    public Post updatePost(Long postId, Post updatedPost) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();
            existingPost.setContent(updatedPost.getContent());
            return postRepository.save(existingPost);
        } else {
            return null;
        }
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}
