package com.example.task_3_1_2.controllers;

import com.example.task_3_1_2.models.User;
import com.example.task_3_1_2.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path = "/data")
public class TestRestController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/users")
    public List<User> showAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return users;
    }

    @GetMapping("/users/{id}")
    public User showUser(@PathVariable long id) {
        return userRepository.findById(id).get();
    }

    @PatchMapping("/edit")
    public User update(@RequestBody User user) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        return user;
    }

    @PostMapping("/add")
    public User test(@RequestBody User user) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        User user2 = userRepository.findByUsername(user.getUsername());
        return user2;
    }

    @GetMapping("/test")
    public String test2() {

        return "test2";
    }
}
