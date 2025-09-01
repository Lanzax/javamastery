package com.javamasters.api.auth;

import com.javamasters.api.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

record AuthRequest(String email, String password) {}
record AuthResponse(String token) {}

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authManager;
  private final JwtService jwtService;

  public AuthController(AuthenticationManager authManager, JwtService jwtService) {
    this.authManager = authManager;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest req) {
    try {
      var auth = authManager.authenticate(
          new UsernamePasswordAuthenticationToken(req.email(), req.password())
      );
      // ruolo dai granted authorities (prendiamo la prima)
      String role = auth.getAuthorities().stream().findFirst()
          .map(a -> a.getAuthority().replace("ROLE_", ""))
          .orElse("USER");

      String token = jwtService.generateToken(req.email(), role, 60L * 60L); // 1h
      return ResponseEntity.ok(new AuthResponse(token));
    } catch (AuthenticationException ex) {
      return ResponseEntity.status(401).body("Invalid credentials");
    }
  }
}
