package com.unidev.universe.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name",nullable=false)
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "email",nullable=false, unique=true)
    private String email;

    @Column(name = "password",nullable=false)
    private String password;
}
