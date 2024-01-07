package com.unidev.universe.services;

import com.unidev.universe.entities.User;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.requests.UpdateProfileRequest;
import com.unidev.universe.responses.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserResponse> getUsersByFilter(String filter) {
        List<User> users = userRepository.findAllByUsername(filter);

        List<UserResponse> result = new ArrayList<>();

        for (User user: users) {
            UserResponse userResponse = new UserResponse();
            userResponse.setUsername(user.getName());
            userResponse.setEmail(user.getEmail());

            result.add(userResponse);
        }

        return result;
    }

    public byte[] getUserProfilePictureImage(String username) {
        User user = userRepository.findByUsername(username);

        if(user == null){
            return null;
        }

        return user.getProfilePicture();
    }

    public boolean updateProfile(UpdateProfileRequest request) throws IOException {
        User user = userRepository.findByUsername(request.getUsername());

        if(user == null){
            return false;
        }

        if(!request.getNewUsername().isEmpty()){
            user.setUsername(request.getNewUsername());
        }
        if(!request.getNewEmail().isEmpty()){
            user.setEmail(request.getNewEmail());
        }
        if(!request.getNewPassword().isEmpty()){
            user.setPassword(request.getNewPassword());
        }
        if(!request.getProfilePicture().isEmpty()){
            user.setProfilePicture(request.getProfilePicture().getBytes());
        }

        userRepository.save(user);

        return true;
    }
}
