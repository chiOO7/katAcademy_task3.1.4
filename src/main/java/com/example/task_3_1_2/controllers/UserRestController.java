package com.example.task_3_1_2.controllers;

import com.example.task_3_1_2.models.User;
import com.example.task_3_1_2.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/userdata")
@PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
public class UserRestController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    User showUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(authentication.getName());
        return user;
    }
}
