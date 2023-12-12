package com.unidev.universe.dto;

import com.unidev.universe.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FollowDTO {
    private User user;
    private User following;
}
