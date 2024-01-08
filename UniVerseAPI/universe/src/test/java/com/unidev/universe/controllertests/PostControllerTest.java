package com.unidev.universe.controllertests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unidev.universe.controllers.PostController;
import com.unidev.universe.dto.PostDTO;
import com.unidev.universe.entities.Post;
import com.unidev.universe.responses.PostResponse;
import com.unidev.universe.services.FriendshipService;
import com.unidev.universe.services.PostService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PostController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @MockBean
    private FriendshipService friendshipService;

    @Test
    public void testGetAllPosts() throws Exception {
        List<PostResponse> posts = Arrays.asList(new PostResponse(), new PostResponse());
        Mockito.when(postService.getAllPosts()).thenReturn(posts);

        mockMvc.perform(get("/api/v1/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetUserPostsCount() throws Exception {
        Mockito.when(postService.getPostsByAuthorName("user1")).thenReturn(Arrays.asList(new Post(), new Post()));

        mockMvc.perform(get("/api/v1/posts/user/user1/count"))
                .andExpect(status().isOk())
                .andExpect(content().string("2"));
    }

    @Test
    public void testGetFriendsPosts() throws Exception {
        Mockito.when(friendshipService.getFriendUsernames("user1")).thenReturn(Arrays.asList("friend1", "friend2"));
        Mockito.when(postService.getPostsByAuthorNames(Mockito.anyList())).thenReturn(Arrays.asList(new PostResponse(), new PostResponse()));

        mockMvc.perform(get("/api/v1/posts/getFriendsPosts/user1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetPostById() throws Exception {
        Post post = new Post();
        post.setId(1L);
        Mockito.when(postService.getPostById(1L)).thenReturn(post);

        mockMvc.perform(get("/api/v1/posts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    public void testCreatePost() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("image", "image.jpg", MediaType.IMAGE_JPEG_VALUE, "imageData".getBytes());
        PostDTO postDTO = new PostDTO();
        postDTO.setTitle("Test Post");
        postDTO.setContent("Content of test post");
        postDTO.setImage(imageFile);

        Post createdPost = new Post();
        createdPost.setImageData(imageFile.getBytes());
        Mockito.when(postService.createPost(Mockito.any(PostDTO.class))).thenReturn(createdPost);

        mockMvc.perform(multipart("/api/v1/posts/createPost")
                        .file(imageFile)
                        .param("title", postDTO.getTitle())
                        .param("content", postDTO.getContent()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG_VALUE));
    }

    @Test
    public void testUpdatePost() throws Exception {
        Post updatedPost = new Post();
        updatedPost.setId(1L);
        updatedPost.setContent("Updated content");
        Mockito.when(postService.updatePost(Mockito.eq(1L), Mockito.any(Post.class))).thenReturn(updatedPost);

        mockMvc.perform(put("/api/v1/posts/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(updatedPost)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", is("Updated content")));
    }

    @Test
    public void testDeletePost() throws Exception {
        mockMvc.perform(delete("/api/v1/posts/1"))
                .andExpect(status().isNoContent());
    }
}

