package com.unidev.universe.services;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.FriendshipStatus;
import com.unidev.universe.entities.User;
import com.unidev.universe.responses.FriendRequestResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FriendshipService {
    List<FriendRequestResponse> getFriendRequests(String username);

    Friendship addFriend(String senderName, String receiverName);

    @Transactional
    void removeFriend(String user1Name, String user2Name);

    void acceptFriendRequest(Long friendshipId);

    @Transactional
    void rejectFriendRequest(Long friendshipId);

    FriendshipStatus areUsersFriends(String user1Name, String user2Name);

    List<User> getOnlineFriends(String username);

    List<String> getFriendUsernames(String username);
}
