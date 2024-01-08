package com.unidev.universe.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/*
* The User cass represents a single user entity
* from the database.
* */

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username",nullable=false, unique=true)
    private String username;

    @Column(name = "email",nullable=false, unique=true)
    private String email;

    @Column(name = "password",nullable=false)
    private String password;

    @Column(columnDefinition = "BYTEA")
    private byte[] profilePicture;

    @Column(name = "refreshToken")
    private String refreshToken;

    @Column(name = "isOnline")
    private Boolean isOnline;

    @Enumerated(EnumType.STRING)
    @Column(name = "roles")
    private UserRole userRole;

    private Boolean isLocked = false;

    private Boolean enabled = true;

    public User(String username, String email, String password, UserRole userRole) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.isOnline = false;
        this.isLocked = false;
        this.enabled = true;
    }

    public User(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleGrantedAuthority =
                new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(simpleGrantedAuthority);
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getName(){
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
