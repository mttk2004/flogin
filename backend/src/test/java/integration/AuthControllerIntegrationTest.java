package integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.FloginApplication;
import com.flogin.dto.LoginRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = FloginApplication.class)
@AutoConfigureMockMvc
public class AuthControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  @DisplayName("Test POST /api/auth/login - Login Successful")
  public void testLoginSuccess() throws Exception {
    LoginRequest request = new LoginRequest("testuser123", "Pass123");

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.success").value(true))
        .andExpect(jsonPath("$.token").exists())
        .andExpect(jsonPath("$.message").value("Đăng nhập thành công"));
  }

  @Test
  @DisplayName("Test POST /api/auth/login - Login Failed (Wrong Password)")
  public void testLoginFailedWrongPassword() throws Exception {
    LoginRequest request = new LoginRequest("testuser123", "WrongPass123");

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.success").value(false))
        .andExpect(jsonPath("$.token").doesNotExist())
        .andExpect(jsonPath("$.message").value("Password không đúng"));
  }

  @Test
  @DisplayName("Test POST /api/auth/login - Validation Error (Empty Username)")
  public void testLoginValidationError() throws Exception {
    LoginRequest request = new LoginRequest("", "Pass123");

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.success").value(false))
        .andExpect(jsonPath("$.message").value("Username là bắt buộc"));
  }

  @Test
  @DisplayName("Test CORS Headers")
  public void testCorsHeaders() throws Exception {
    LoginRequest request = new LoginRequest("testuser123", "Pass123");

    mockMvc.perform(post("/api/auth/login")
        .header("Origin", "http://localhost:5173")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));
  }
}
