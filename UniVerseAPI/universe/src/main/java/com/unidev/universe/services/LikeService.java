package com.unidev.universe.services;

import com.unidev.universe.entities.Like;
import com.unidev.universe.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LikeService {
    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public int getPostLikes(int postId) {
        return likeRepository.countByPostId(postId);
    }

    public boolean isPostLiked(int postId, String username) {
        return likeRepository.existsByPostIdAndUsername(postId, username);
    }

    public void likePost(int postId, String username) {
        if (!likeRepository.existsByPostIdAndUsername(postId, username)) {
            likeRepository.saveLike(postId, username);
        }
    }

    public void unlikePost(long postId, String username) {
        likeRepository.deleteByPostIdAndUsername(postId, username);
    }
}