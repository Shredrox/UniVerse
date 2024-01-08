package com.unidev.universe.services;

import org.springframework.transaction.annotation.Transactional;

public interface LikeService {
    int getPostLikes(long postId);

    boolean isPostLiked(long postId, String username);

    void likePost(long postId, String username);

    @Transactional
    void unlikePost(long postId, String username);
}