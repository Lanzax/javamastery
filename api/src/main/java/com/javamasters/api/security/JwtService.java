package com.javamasters.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
  // Chiave segreta per sviluppo (32+ bytes). In prod spostarla in variabile d’ambiente.
  private static final String SECRET = "change-me-please-change-me-please-32bytes-min";
  private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

  public String generateToken(String subject, String role, long expiresInSeconds) {
    Instant now = Instant.now();
    return Jwts.builder()
        .setSubject(subject)
        .addClaims(Map.of("role", role))
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plusSeconds(expiresInSeconds)))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public Jws<Claims> parse(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token);
  }
}
