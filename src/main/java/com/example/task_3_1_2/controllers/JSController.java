package com.example.task_3_1_2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping(path = "/script.js")
public class JSController {
    @GetMapping
    String getScript() {
        return "script.js";
    }
}
