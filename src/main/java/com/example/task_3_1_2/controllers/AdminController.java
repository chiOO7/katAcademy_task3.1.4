package com.example.task_3_1_2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/admin")
public class AdminController {

    @GetMapping(path = "")
    public String showAdminPage() {
        return "admin_rest";
    }
}
