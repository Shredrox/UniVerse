package com.unidev.universe.services;

import com.unidev.universe.entities.Like;
import com.unidev.universe.repository.LikeRepository;
import com.unidev.universe.repository.PostRepository;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public int getPostLikes(int postId) {
        return likeRepository.findByPostId(postId).size();
    }

    public boolean isPostLiked(int postId, String username) {
        return likeRepository.existsByPostIdAndUserId(postId, userRepository.findByUsername(username).getId());
    }

    public void likePost(int postId, String username) {
        List<Like> existingLike = likeRepository.findByPostIdAndUserId(postId, userRepository.findByUsername(username).getId());
        if (existingLike.isEmpty()) {
            Like newLike = new Like();
            newLike.setPost(postRepository.findById(postId));
            newLike.setUser(userRepository.findByUsername(username));
            likeRepository.save(newLike);
        }
    }

    public void unlikePost(long postId, String username) {
        likeRepository.deleteByPostIdAndUserId(postId, userRepository.findByUsername(username).getId());
    }
}