package com.flogin.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Service layer for authentication operations
 * Handles user authentication and credential validation
 */
@Service
public class AuthService {

  private final BCryptPasswordEncoder passwordEncoder;

  public AuthService() {
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  /**
   * Validation result class to hold validation status and error message
   */
  public static class ValidationResult {
    private final boolean valid;
    private final String error;

    public ValidationResult(boolean valid, String error) {
      this.valid = valid;
      this.error = error;
    }

    public boolean isValid() {
      return valid;
    }

    public String getError() {
      return error;
    }
  }

  /**
   * Authentication result class to hold authentication status and token
   */
  public static class AuthenticationResult {
    private final boolean success;
    private final String token;
    private final String message;

    public AuthenticationResult(boolean success, String token, String message) {
      this.success = success;
      this.token = token;
      this.message = message;
    }

    public boolean isSuccess() {
      return success;
    }

    public String getToken() {
      return token;
    }

    public String getMessage() {
      return message;
    }
  }

  /**
   * Validates username according to the following rules:
   * - Required: must not be empty or null
   * - Length: 3-50 characters (inclusive)
   * - Characters: only alphanumeric (a-z, A-Z, 0-9)
   * - No special characters allowed
   * - No spaces allowed
   *
   * @param username The username to validate
   * @return ValidationResult with validation status and error message
   */
  public ValidationResult validateUsername(String username) {
    // Check for null or empty
    if (username == null || username.isEmpty()) {
      return new ValidationResult(false, "Username là bắt buộc");
    }

    // Check for whitespace only
    if (username.trim().isEmpty()) {
      return new ValidationResult(false, "Username là bắt buộc");
    }

    // Check minimum length
    if (username.length() < 3) {
      return new ValidationResult(false, "Username phải có ít nhất 3 ký tự");
    }

    // Check maximum length
    if (username.length() > 50) {
      return new ValidationResult(false, "Username không được vượt quá 50 ký tự");
    }

    // Check for alphanumeric and ., _, -
    if (!username.matches("^[a-zA-Z0-9._-]+$")) {
      return new ValidationResult(false, "Username chỉ được chứa chữ, số, và các ký tự ., _, -");
    }

    return new ValidationResult(true, null);
  }

  /**
   * Validates password according to the following rules:
   * - Required: must not be empty or null
   * - Length: 6-100 characters (inclusive)
   * - Composition: must contain BOTH letters (a-z, A-Z) AND numbers (0-9)
   * - Special characters are allowed but not required
   * - Must not be only whitespace
   *
   * @param password The password to validate
   * @return ValidationResult with validation status and error message
   */
  public ValidationResult validatePassword(String password) {
    // Check for null or empty
    if (password == null || password.isEmpty()) {
      return new ValidationResult(false, "Password là bắt buộc");
    }

    // Check for whitespace only
    if (password.trim().isEmpty()) {
      return new ValidationResult(false, "Password là bắt buộc");
    }

    // Check minimum length
    if (password.length() < 6) {
      return new ValidationResult(false, "Password phải có ít nhất 6 ký tự");
    }

    // Check maximum length
    if (password.length() > 100) {
      return new ValidationResult(false, "Password không được vượt quá 100 ký tự");
    }

    // Check for letters (a-z, A-Z)
    boolean hasLetters = password.matches(".*[a-zA-Z].*");
    if (!hasLetters) {
      return new ValidationResult(false, "Password phải chứa cả chữ cái và số");
    }

    // Check for numbers (0-9)
    boolean hasNumbers = password.matches(".*[0-9].*");
    if (!hasNumbers) {
      return new ValidationResult(false, "Password phải chứa cả chữ cái và số");
    }

    return new ValidationResult(true, null);
  }

  /**
   * Authenticates a user with username and password
   *
   * This is a simplified implementation for testing purposes.
   * In a real application, this would:
   * 1. Query the database for the user
   * 2. Compare the hashed password
   * 3. Generate a JWT token
   * 4. Return the token and user information
   *
   * For testing, we use a hardcoded user: username="testuser123",
   * password="Pass123"
   *
   * @param username The username to authenticate
   * @param password The password to authenticate
   * @return AuthenticationResult with authentication status, token, and message
   */
  public AuthenticationResult authenticate(String username, String password) {
    // Validate username
    ValidationResult usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid()) {
      return new AuthenticationResult(false, null, usernameValidation.getError());
    }

    // Validate password
    ValidationResult passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid()) {
      return new AuthenticationResult(false, null, passwordValidation.getError());
    }

    // Simulate database lookup and authentication
    // In a real application, this would query the database
    // For testing purposes, we use hardcoded credentials
    String validUsername = "testuser123";
    // This is the BCrypt hash of "Pass123"
    // In production, passwords would be hashed and stored in the database
    String validPasswordHash = passwordEncoder.encode("Pass123");

    // Check if username exists
    if (!username.equals(validUsername)) {
      return new AuthenticationResult(false, null, "Username không tồn tại");
    }

    // Check if password matches
    if (!passwordEncoder.matches(password, validPasswordHash)) {
      return new AuthenticationResult(false, null, "Password không đúng");
    }

    // Authentication successful - generate a mock JWT token
    // In a real application, this would use a JWT library to generate a proper
    // token
    String mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMTIzIn0.mockSignature";

    return new AuthenticationResult(true, mockToken, "Đăng nhập thành công");
  }
}
