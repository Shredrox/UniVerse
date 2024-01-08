package com.unidev.universe.controllertests;

import com.unidev.universe.controllers.LikeController;
import com.unidev.universe.dto.LikeDTO;
import com.unidev.universe.services.LikeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class LikeControllerTest {

    @Mock
    private LikeService likeService;

    @InjectMocks
    private LikeController likeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getPostLikes() {
        when(likeService.getPostLikes(anyLong())).thenReturn(5);

        ResponseEntity<Integer> response = likeController.getPostLikes(123L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(5, response.getBody());
    }

    @Test
    void getIsLiked() {
        when(likeService.isPostLiked(anyLong(), anyString())).thenReturn(true);

        ResponseEntity<Boolean> response = likeController.getIsLiked(123L, "user123");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, response.getBody());
    }

    @Test
    void likePost() {
        LikeDTO likeDTO = new LikeDTO();
        likeDTO.setPostId(123L);
        likeDTO.setUsername("user123");

        ResponseEntity<String> response = likeController.likePost(likeDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Post liked successfully.", response.getBody());
    }

    @Test
    void unlikePost() {
        ResponseEntity<String> response = likeController.unlikePost(123L, "user123");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Post unliked successfully.", response.getBody());
    }
}