package com.unidev.universe.controllers;

import com.unidev.universe.authentication.UserDetailsServiceImpl;
import com.unidev.universe.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/exists/{username}")
    public ResponseEntity<Boolean> userExists(@PathVariable String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByName(@PathVariable String username) {
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}/online-friends")
    public ResponseEntity<List<User>> getUserOnlineFriends(@PathVariable String username) {
        List<User> onlineFriends = userService.getOnlineFriends(username);
        return ResponseEntity.ok(onlineFriends);
    }

    @GetMapping("/check-friendship")
    public ResponseEntity<Boolean> checkFriendship(@RequestParam String usernameUser1, @RequestParam String usernameUser2) {
        boolean areFriends = userService.areFriends(usernameUser1, usernameUser2);
        return ResponseEntity.ok(areFriends);
    }

    @PostMapping("/{userId}/add-friend/{friendId}")
    public ResponseEntity<String> addFriend(@PathVariable String loggedInUser, @PathVariable String profileUser) {
        userService.addFriend(loggedInUser, profileUser);
        return ResponseEntity.ok("Friend added successfully");
    }

    @DeleteMapping("/{userId}/remove-friend/{friendId}")
    public ResponseEntity<String> removeFriend(@PathVariable String loggedInUser, @PathVariable String profileUser) {
        userService.removeFriend(loggedInUser, profileUser);
        return ResponseEntity.ok("Friend removed successfully");
    }
}