package com.unidev.universe.services;

import com.unidev.universe.entities.User;
import com.unidev.universe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public Optional<User> getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return Optional.ofNullable(user);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
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

    public boolean areFriends(String usernameUser1, String usernameUser2) {
        Optional<User> optionalUser1 = Optional.ofNullable(userRepository.findByUsername(usernameUser1));
        Optional<User> optionalUser2 = Optional.ofNullable(userRepository.findByUsername(usernameUser2));

        if (optionalUser1.isPresent() && optionalUser2.isPresent()) {
            boolean user1IsFriendOfUser2 = userRepository.checkFriendship(usernameUser1, usernameUser2);
            boolean user2IsFriendOfUser1 = userRepository.checkFriendship(usernameUser2, usernameUser1);

            return user1IsFriendOfUser2 && user2IsFriendOfUser1;
        }

        return false;
    }

    public void addFriend(String loggedInUser, String profileUser) {
        Optional<User> optionalLoggedInUser = Optional.ofNullable(userRepository.findByUsername(loggedInUser));
        Optional<User> optionalProfileUser = Optional.ofNullable(userRepository.findByUsername(profileUser));

        if (optionalLoggedInUser.isPresent() && optionalProfileUser.isPresent()) {
            userRepository.addFriendByUsername(loggedInUser, profileUser);
            userRepository.addFriendByUsername(profileUser, loggedInUser);
        }
    }

    public void removeFriend(String loggedInUser, String profileUser) {
        Optional<User> optionalLoggedInUser = Optional.ofNullable(userRepository.findByUsername(loggedInUser));
        Optional<User> optionalProfileUser = Optional.ofNullable(userRepository.findByUsername(profileUser));

        if (optionalLoggedInUser.isPresent() && optionalProfileUser.isPresent()) {
            userRepository.removeFriendByUsername(loggedInUser, profileUser);
            userRepository.removeFriendByUsername(profileUser, loggedInUser);
        }
    }
}
