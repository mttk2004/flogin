package com.flogin.controller;

import com.flogin.dto.LoginRequest;
import com.flogin.dto.LoginResponse;
import com.flogin.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow Frontend origin
public class AuthController {

  private final AuthService authService;

  @Autowired
  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    // Validation for empty body is handled by Spring's @RequestBody but we can add
    // check
    if (loginRequest == null) {
      return ResponseEntity.badRequest()
          .body(new LoginResponse(false, "Request body is missing", null));
    }

    AuthService.AuthenticationResult result = authService.authenticate(
        loginRequest.getUsername(),
        loginRequest.getPassword());

    if (result.isSuccess()) {
      return ResponseEntity.ok(
          new LoginResponse(true, result.getMessage(), result.getToken()));
    } else {
      // Determine status code based on error
      HttpStatus status = HttpStatus.UNAUTHORIZED;
      if (result.getMessage().contains("bắt buộc") ||
          result.getMessage().contains("ký tự") ||
          result.getMessage().contains("chứa")) {
        status = HttpStatus.BAD_REQUEST; // Validation error
      }

      return ResponseEntity.status(status)
          .body(new LoginResponse(false, result.getMessage(), null));
    }
  }
}
