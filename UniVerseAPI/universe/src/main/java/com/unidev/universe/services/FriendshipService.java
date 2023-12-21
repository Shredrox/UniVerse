package com.unidev.universe.services;

import com.unidev.universe.entities.Friendship;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.FriendshipRepository;
import com.unidev.universe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
