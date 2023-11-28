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
@Table(name="follows")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private int followId; //the id of the follow itself

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "following_user_id")
    User following;
}
