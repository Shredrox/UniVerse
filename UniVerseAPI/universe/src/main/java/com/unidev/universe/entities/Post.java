package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "content")
    private String content;

    @Column(columnDefinition = "BYTEA")
    private byte[] imageData;

    @NotNull
    @Column(name = "authorName")
    private String authorName;

    @NotNull
    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
