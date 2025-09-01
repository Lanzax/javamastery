package com.javamasters.api.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DemoController {

  @GetMapping("/me")
  public Map<String, String> me() {
    return Map.of("message", "You are authenticated 🎯");
  }
}
