package com.unidev.universe.controllers;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.FriendshipStatus;
import com.unidev.universe.entities.User;
import com.unidev.universe.requests.FriendRequest;
import com.unidev.universe.responses.FriendRequestResponse;
import com.unidev.universe.services.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friendships")
public class FriendshipController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final FriendshipService friendshipService;

    @GetMapping("/{username}/online-friends")
    public ResponseEntity<List<String>> getUserOnlineFriends(@PathVariable String username) {
        List<User> onlineFriends = friendshipService.getOnlineFriends(username);

        List<String> onlineFriendsUsernames = onlineFriends.stream().map(User::getName).toList();

        return ResponseEntity.ok(onlineFriendsUsernames);
    }

    @MessageMapping("/sendIsOnlineAlert")
    public void addNewOnlineUser(@Payload String username) {
        List<String> userFriends = friendshipService.getFriendUsernames(username);

        if(userFriends.isEmpty()){
            return;
        }

        for (String friend: userFriends) {
            if(friend.equals(username)){
                continue;
            }
            simpMessagingTemplate.convertAndSendToUser(friend, "/queue/online-friends", username);
        }
    }

    @GetMapping("/{username}/count")
    public ResponseEntity<Integer> getUserFriendsCount(@PathVariable String username) {
        return ResponseEntity.ok(friendshipService.getFriendUsernames(username).size());
    }

    @GetMapping("/{username}/friend-requests")
    public ResponseEntity<List<FriendRequestResponse>> getFriendRequests(@PathVariable String username) {
        return ResponseEntity.ok(friendshipService.getFriendRequests(username));
    }

    @GetMapping("/check-friendship")
    public ResponseEntity<FriendshipStatus> checkFriendship(@RequestParam String usernameUser1, @RequestParam String usernameUser2) {
        FriendshipStatus friendshipStatus = friendshipService.areUsersFriends(usernameUser1, usernameUser2);
        return ResponseEntity.ok(friendshipStatus);
    }

    @MessageMapping("/sendFriendRequest")
    public void addFriend(@Payload FriendRequest friendRequest) {
        Friendship newFriendship = friendshipService.addFriend(friendRequest.getSender(), friendRequest.getReceiver());

        if(newFriendship == null){
            return;
        }

        FriendRequestResponse friendRequestResponse = new FriendRequestResponse();
        friendRequestResponse.setId(newFriendship.getId());
        friendRequestResponse.setSenderName(friendRequest.getSender());

        simpMessagingTemplate.convertAndSendToUser(friendRequest.getReceiver(), "/queue/friend-request", friendRequestResponse);
    }

    @PostMapping("/accept-friend-request/{friendRequestId}")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable Long friendRequestId) {
        friendshipService.acceptFriendRequest(friendRequestId);
        return ResponseEntity.ok("Friend request accepted.");
    }

    @DeleteMapping("/reject-friend-request/{friendRequestId}")
    public ResponseEntity<String> rejectFriendRequest(@PathVariable Long friendRequestId) {
        friendshipService.rejectFriendRequest(friendRequestId);
        return ResponseEntity.ok("Friend request rejected.");
    }

    @DeleteMapping("/{usernameUser1}/remove-friend/{usernameUser2}")
    public ResponseEntity<String> removeFriend(@PathVariable String usernameUser1, @PathVariable String usernameUser2) {
        friendshipService.removeFriend(usernameUser1, usernameUser2);
        return ResponseEntity.ok("Friend removed successfully.");
    }
}
