package com.unidev.universe.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "message")
    private String message;

    @NotNull
    @Column(name = "type")
    private String type;

    @NotNull
    @Column(name = "source")
    private String source;

    @NotNull
    @Column(name = "recipient_name")
    private String recipientName;

    @NotNull
    @Column(name = "time_stamp")
    private LocalDateTime timestamp;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "is_read")
    private boolean isRead;
}