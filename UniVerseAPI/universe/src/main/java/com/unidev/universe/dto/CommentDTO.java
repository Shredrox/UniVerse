package com.unidev.universe.dto;

import com.unidev.universe.entities.Post;
import com.unidev.universe.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CommentDTO {
    @NotBlank(message = "Comment description field cannot be blank!")
    private String description;

    @NotBlank(message = "Post field cannot be blank!")
    private Post post;

    private User user;
}
