package com.javatechie.jwt.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.javatechie.jwt.api.entity.User;
import com.javatechie.jwt.api.repository.UserRepository;
@CrossOrigin
@RestController
public class UserController {
	  @Autowired
	  private UserRepository userRepository;
		
	    @GetMapping(value = "/findById/{id}")
		public Optional<User> findById(@PathVariable("id") Long id) {
			return userRepository.findById(id);    
		}
	    
}
