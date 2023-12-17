package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user1_id")
    User user1;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user2_id")
    User user2;

    @NotNull
    @Column(name = "created_at")
    Date createdAt;
}
