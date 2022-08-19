package com.example.task_3_1_2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/admin3")
public class AdminRestController {

    @GetMapping(path = "")
    public String showAllUsers(Model model) {

        return "admin_rest";
    }


}
