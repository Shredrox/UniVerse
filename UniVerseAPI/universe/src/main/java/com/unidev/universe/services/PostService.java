package com.unidev.universe.services;

import com.unidev.universe.dto.PostDTO;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.PostRepository;
import com.unidev.universe.entities.Post;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    public List<Post> getPostsByAuthorNames(List<String> authorNames) {
        return postRepository.findAllByAuthorNameIn(authorNames);
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
