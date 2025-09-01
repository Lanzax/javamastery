package com.javamasters.api.config;

import com.javamasters.api.user.User;
import com.javamasters.api.user.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public org.springframework.boot.CommandLineRunner dataSeeder(
      UserRepository repo, PasswordEncoder encoder) {
    return args -> {
      // utente admin demo solo se non presente
      String email = "admin@demo.it";
      if (!repo.existsByEmail(email)) {
        User u = new User(email, encoder.encode("admin"), "ADMIN");
        repo.save(u);
      }
    };
  }
}
