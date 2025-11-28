package com.flogin.security;

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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = FloginApplication.class)
@AutoConfigureMockMvc
public class SecurityTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  @DisplayName("Security: Ngăn chặn SQL Injection tại Login")
  public void testPreventSqlInjection() throws Exception {
    // Thử tấn công SQL Injection phổ biến
    LoginRequest attackRequest = new LoginRequest("admin' OR '1'='1", "password");

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(attackRequest)))
        // Mong đợi 400 Bad Request (do validation) hoặc 401 Unauthorized (do sai user)
        .andExpect(status().isBadRequest());
  }

  @Test
  @DisplayName("Security: Ngăn chặn truy cập trái phép (Auth Bypass)")
  public void testPreventUnauthorizedAccess() throws Exception {
    // Thử xóa sản phẩm (API yêu cầu quyền ADMIN) mà không có Token
    mockMvc.perform(delete("/api/products/1")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isForbidden()); // Spring Security trả về 403 Forbidden hoặc 401 khi không có auth
  }

  @Test
  @DisplayName("Security: Kiểm tra Input Validation (XSS Prevention)")
  public void testInputSanitization() throws Exception {
    // Login với ký tự đặc biệt script tag
    LoginRequest xssRequest = new LoginRequest("<script>alert(1)</script>", "password");

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(xssRequest)))
        .andExpect(status().isBadRequest()); // Validator nên chặn ký tự đặc biệt
  }
}
