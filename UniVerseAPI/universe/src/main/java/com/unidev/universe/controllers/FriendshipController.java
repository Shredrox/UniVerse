package com.unidev.universe.controllers;

import com.unidev.universe.entities.User;
import com.unidev.universe.services.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friendships")
public class FriendshipController {
    private final FriendshipService friendshipService;

    @GetMapping("/{username}/online-friends")
    public ResponseEntity<List<User>> getUserOnlineFriends(@PathVariable String username) {
        List<User> onlineFriends = friendshipService.getOnlineFriends(username);
        return ResponseEntity.ok(onlineFriends);
    }

    @GetMapping("/check-friendship")
    public ResponseEntity<Boolean> checkFriendship(@RequestParam String usernameUser1, @RequestParam String usernameUser2) {
        boolean areFriends = friendshipService.areUsersFriends(usernameUser1, usernameUser2);
        return ResponseEntity.ok(areFriends);
    }

    @PostMapping("/{usernameUser1}/add-friend/{usernameUser2}")
    public ResponseEntity<String> addFriend(@PathVariable String usernameUser1, @PathVariable String usernameUser2) {
        friendshipService.addFriend(usernameUser1, usernameUser2);
        return ResponseEntity.ok("Friend added successfully.");
    }

    @DeleteMapping("/{usernameUser1}/remove-friend/{usernameUser2}")
    public ResponseEntity<String> removeFriend(@PathVariable String usernameUser1, @PathVariable String usernameUser2) {
        friendshipService.removeFriend(usernameUser1, usernameUser2);
        return ResponseEntity.ok("Friend removed successfully.");
    }
}
