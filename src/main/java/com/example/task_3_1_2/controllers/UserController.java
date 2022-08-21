package com.example.task_3_1_2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/user")
public class UserController {
    @GetMapping(path = "")
    public String showUserPage() {
        return "user";
    }
}
