package com.example.task_3_1_2.controllers;


import com.example.task_3_1_2.models.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/user")
@PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
public class UserController {

    @GetMapping("/{user}")
    String showUser(@PathVariable("user") User user, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (user.getUsername().equals(authentication.getName()) ||
                AuthorityUtils.authorityListToSet(authentication.getAuthorities()).contains("ADMIN")) {
            model.addAttribute("user", user);
            return "user";
        }
        return "error";
    }
}
