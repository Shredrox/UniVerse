package com.unidev.universe.dto;

import com.unidev.universe.entities.Post;
import com.unidev.universe.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LikeDTO {
    private User user;
    private Post post;
}
