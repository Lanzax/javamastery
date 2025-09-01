package com.javamasters.api.security;

import com.javamasters.api.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository repo;

  public UserDetailsServiceImpl(UserRepository repo) {
    this.repo = repo;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var u = repo.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    // Usa il tipo fully-qualified per evitare conflitto con la tua entity User
    return org.springframework.security.core.userdetails.User
        .withUsername(u.getEmail())
        .password(u.getPassword())
        .roles(u.getRole()) // es: ADMIN o USER
        .build();
  }
}
