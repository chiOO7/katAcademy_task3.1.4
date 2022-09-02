package com.example.task_3_1_2.controllers;

import com.example.task_3_1_2.models.User;
import com.example.task_3_1_2.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping(path = "/data")
public class AdminRestController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/users")
    public List<User> getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return users;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        return userRepository.findById(id).get();
    }

    @PatchMapping("/edit")
    public User updateUser(@RequestBody User user) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        return user;
    }

    @DeleteMapping("/delete")
    public User deleteUser(@RequestBody User user) {
        userRepository.deleteById(user.getId());
        return user;
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        User user2 = userRepository.findByUsername(user.getUsername());
        return user2;
    }
}
