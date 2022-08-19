package com.example.task_3_1_2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/scripts/scripts.js")
public class JSController {
    @GetMapping
    String getScript() {
        return "function test() {\n" +
                "    alert(\"test!\")\n" +
                "    // fetch(\"https://localhost\")\n" +
                "}";
    }
}
