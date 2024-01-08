package com.unidev.universe.controllertests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unidev.universe.controllers.CommentController;
import com.unidev.universe.dto.CommentDTO;
import com.unidev.universe.entities.Comment;
import com.unidev.universe.services.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc(addFilters = false)
public class CommentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetAllComments() throws Exception {
        List<Comment> mockComments = Arrays.asList(new Comment(), new Comment());
        when(commentService.getAllComments()).thenReturn(mockComments);

        mockMvc.perform(get("/api/v1/comments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetCommentById() throws Exception {
        Comment mockComment = new Comment();
        long commentId = 1L;
        when(commentService.getCommentById(commentId)).thenReturn(mockComment);

        mockMvc.perform(get("/api/v1/comments/" + commentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").exists());
    }

    // Add other test methods here...

    // Example for a POST request test
    @Test
    public void testCreateComment() throws Exception {
        CommentDTO request = new CommentDTO();
        Comment mockComment = new Comment();
        when(commentService.createComment(request)).thenReturn(mockComment);

        mockMvc.perform(post("/api/v1/comments/addComment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    // Continue with tests for other methods like updateComment, deleteComment, etc.
}

