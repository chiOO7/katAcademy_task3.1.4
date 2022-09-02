package com.example.task_3_1_2.controllers;

import com.example.task_3_1_2.models.User;
import com.example.task_3_1_2.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(path = "/userdata")
public class UserRestController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    User showUser(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return user;
    }
}
