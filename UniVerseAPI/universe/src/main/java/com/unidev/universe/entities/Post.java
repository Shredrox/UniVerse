package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
