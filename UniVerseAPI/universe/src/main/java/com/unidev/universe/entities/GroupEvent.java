package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "group_events")
public class GroupEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "date")
    LocalDateTime date;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "organiser_id")
    User organiser;

    @ManyToMany
    @JoinTable(
            name = "group_event_attendees",
            joinColumns = @JoinColumn(name = "group_event_id"),
            inverseJoinColumns = @JoinColumn(name = "attendee_id")
    )
    List<User> attendees;
}
