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
@Table(name = "friendships")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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
    @Column(name = "date")
    Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FriendshipStatus status;
}
