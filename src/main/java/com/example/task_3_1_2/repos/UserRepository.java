package com.example.task_3_1_2.repos;

import org.springframework.data.repository.CrudRepository;

import com.example.task_3_1_2.models.User;


public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
