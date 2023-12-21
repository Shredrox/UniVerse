package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
