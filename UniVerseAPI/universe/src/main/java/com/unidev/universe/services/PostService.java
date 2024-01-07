package com.unidev.universe.services;

import com.unidev.universe.dto.PostDTO;
import com.unidev.universe.entities.Post;
import com.unidev.universe.responses.PostResponse;

import java.io.IOException;
import java.util.List;

public interface PostService {

    List<Post> getAllPosts();

    Post getPostById(Long postId);

    List<PostResponse> getPostsByAuthorNames(List<String> authorNames);

    List<Post> getPostsByAuthorName(String authorName);

    byte[] getPostImage(Long postId);

    Post createPost(PostDTO request) throws IOException;

    Post updatePost(Long postId, Post updatedPost);

    void deletePost(Long postId);
}
