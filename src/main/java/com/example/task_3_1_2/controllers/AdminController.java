package com.example.task_3_1_2.controllers;


import com.example.task_3_1_2.models.User;
import com.example.task_3_1_2.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/admin")
//@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

//    @GetMapping(path = "/add")
//    public String addUserPage(Model model) {
//        model.addAttribute("user", new User());
//        return "add_user";
//    }

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public String addNewUser(@ModelAttribute("user") User user) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        return redirectToAdmin();
    }

//    @GetMapping("/edit/{id}")
//    public String edit(Model model, @PathVariable("id") long id) {
//        model.addAttribute("user", userRepository.findById(id));
//        return "edit";
//    }

    @PatchMapping("/edit/{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") long id) {
        user.setActive(true);
        user.setUsername(user.getEmail());
        userRepository.save(user);
        return redirectToAdmin();
    }



    @GetMapping(path = "")
    public String showAllUsers(Model model) {
        List<User> users = (List<User>) userRepository.findAll();
//        User admin = users.stream().filter(x -> x.getEmail().equals(SecurityContextHolder.getContext()
//                .getAuthentication().getName())).findAny().get();
//        model.addAttribute("admin", admin);
        model.addAttribute("users", users);
        model.addAttribute("new_user", new User());
        return "admin";
    }

    @DeleteMapping(path = "/delete/{id}")
    public String delete(@PathVariable("id") long id) {
        userRepository.deleteById(id);
        return redirectToAdmin();
    }

    private String redirectToAdmin() {
        return "redirect:/admin";
    }
}
