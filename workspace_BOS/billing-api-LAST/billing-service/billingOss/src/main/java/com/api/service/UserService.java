package com.api.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.api.model.User;

public interface UserService extends UserDetailsService {
     Collection<GrantedAuthority> getAuthorities(String userName);
     public User readUser(String userName);
     //public void deleteUser(String username);
     public PasswordEncoder passwordEncoder();
}
