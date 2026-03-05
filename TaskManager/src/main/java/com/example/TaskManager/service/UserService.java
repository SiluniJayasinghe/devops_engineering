package com.example.TaskManager.service;

import com.example.TaskManager.model.User;
import com.example.TaskManager.repository.UserRepository;
import com.example.TaskManager.requests.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public User addUser(User user) {
        return userRepository.save(user);
    }

    public Boolean loginUser(LoginRequest loginRequest) {
        Optional<User> user = userRepository.findById(loginRequest.getUsername());
        if (user == null) {
            return false;
        }
        User user1 = user.get();

        if(!user1.getPassword().equals(loginRequest.getPassword())) {
            return false;
        }
        return true;


    }
}
