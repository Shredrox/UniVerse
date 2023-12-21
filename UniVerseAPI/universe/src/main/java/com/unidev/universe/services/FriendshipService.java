package com.unidev.universe.services;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.FriendshipRepository;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public void addFriend(String user1, String user2){
        Friendship newFriendship = new Friendship();
        newFriendship.setUser1(userRepository.findByUsername(user1));
        newFriendship.setUser2(userRepository.findByUsername(user2));
        friendshipRepository.save(newFriendship);
    }

    public void removeFriend(String user1, String user2){
        friendshipRepository.deleteByUser1AndUser2(userRepository.findByUsername(user1), userRepository.findByUsername(user2));
    }

    public boolean areUsersFriends(String user1, String user2) {
        return friendshipRepository.existsByUser1AndUser2(userRepository.findByUsername(user1), userRepository.findByUsername(user2));
    }

    public List<User> getOnlineFriends(String username) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUsername(username));
        if (optionalUser.isPresent()) {
            List<User> onlineFriends = new ArrayList<>();

            List<String> friendUsernames = getFriendUsernames(username);

            for (String friendUsername : friendUsernames) {
                Optional<User> friendEntity = Optional.ofNullable(userRepository.findByUsername(friendUsername));
                if (friendEntity.isPresent()) {
                    User friend = friendEntity.get();
                    if (friend.getEmail() != null) {
                        onlineFriends.add(friend);
                    }
                }
            }
            return onlineFriends;
        }
        return new ArrayList<>();
    }

    public List<String> getFriendUsernames(String username) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUsername(username));
        List<String> friendUsernames = new ArrayList<>();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<User> allUsers = userRepository.findAll();

            for (User friend : allUsers) {
                // Checking if the friend's email and username are not null
                if (!friend.getEmail().isEmpty() && !friend.getUsername().equals(user.getUsername())) {
                    friendUsernames.add(friend.getUsername());
                }
            }
        }

        return friendUsernames;
    }
}
