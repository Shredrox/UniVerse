package com.unidev.universe.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "chat_id")
    Chat chat;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "sender_id")
    User sender;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    User receiver;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "timestamp")
    private Date timestamp;
}
