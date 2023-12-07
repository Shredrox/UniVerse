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
@Table(name = "group_event")
public class GroupEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int id;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "date")
    Date date;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User organiser;
}
