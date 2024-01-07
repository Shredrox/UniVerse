package com.unidev.universe.services;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.FriendshipStatus;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.FriendshipRepository;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.responses.FriendRequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public List<FriendRequestResponse> getFriendRequests(String username){
        User user = userRepository.findByUsername(username);
        List<Friendship> friendships = friendshipRepository.findAllByUser2AndStatus(user, FriendshipStatus.PENDING);

        List<FriendRequestResponse> requests = new ArrayList<>();

        for (Friendship friendship : friendships) {
            FriendRequestResponse response = new FriendRequestResponse();
            response.setId(friendship.getId());
            response.setSenderName(friendship.getUser1().getName());

            requests.add(response);
        }

        return requests;
    }

    public Friendship addFriend(String senderName, String receiverName){
        User sender = userRepository.findByUsername(senderName);
        User receiver = userRepository.findByUsername(receiverName);

        if(sender != null && receiver != null){
            Friendship newFriendship = new Friendship();
            newFriendship.setUser1(sender);
            newFriendship.setUser2(receiver);
            newFriendship.setDate(LocalDateTime.now());
            newFriendship.setStatus(FriendshipStatus.PENDING);

            friendshipRepository.save(newFriendship);
            return newFriendship;
        }

        return null;
    }

    @Transactional
    public void removeFriend(String user1Name, String user2Name){
        User user1 = userRepository.findByUsername(user1Name);
        User user2 = userRepository.findByUsername(user2Name);

        friendshipRepository.deleteByUser1AndUser2OrUser1AndUser2(user1, user2, user2, user1);
    }

    public void acceptFriendRequest(Long friendshipId){
        Friendship friendship = friendshipRepository.findById(friendshipId).get();
        friendship.setStatus(FriendshipStatus.ACCEPTED);

        friendshipRepository.save(friendship);
    }

    @Transactional
    public void rejectFriendRequest(Long friendshipId){
        friendshipRepository.deleteById(friendshipId);
    }

    public FriendshipStatus areUsersFriends(String user1Name, String user2Name) {
        User user1 = userRepository.findByUsername(user1Name);
        User user2 = userRepository.findByUsername(user2Name);

        Friendship friendship = friendshipRepository.findByUser1AndUser2OrUser1AndUser2(user1, user2, user2, user1);

        if(friendship == null){
            return FriendshipStatus.NOTFRIENDS;
        }

        return friendship.getStatus();
    }

    public List<User> getOnlineFriends(String username) {
        User user = userRepository.findByUsername(username);

        if (user != null) {
            List<User> onlineFriends = new ArrayList<>();
            List<String> friendUsernames = getFriendUsernames(username);
            List<User> friends = userRepository.findByUsernameIn(friendUsernames);

            for (User friend : friends) {
                if(friend.getIsOnline() != null){
                    if(friend.getIsOnline()){
                        onlineFriends.add(friend);
                    }
                }
            }
            return onlineFriends;
        }
        return new ArrayList<>();
    }

    public List<String> getFriendUsernames(String username) {
        User user = userRepository.findByUsername(username);
        List<String> friendUsernames = new ArrayList<>();

        if (user != null) {
            List<Friendship> userFriendships = friendshipRepository.findAllByUser1OrUser2(user, user);

            for (Friendship friendship : userFriendships) {
                if(friendship.getStatus() == FriendshipStatus.PENDING){
                    continue;
                }

                if(Objects.equals(friendship.getUser1(), user)){
                    friendUsernames.add(friendship.getUser2().getName());
                }
                else{
                    friendUsernames.add(friendship.getUser1().getName());
                }
            }
        }

        return friendUsernames;
    }
}
