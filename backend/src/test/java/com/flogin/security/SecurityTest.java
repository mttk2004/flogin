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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
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
                // Tuyệt đối không được là 200 OK
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

    @Test
    @DisplayName("Security: Kiểm tra Security Headers (Best Practices)")
    public void testSecurityHeaders() throws Exception {
        // Gọi một public endpoint để kiểm tra headers trả về
        // Sử dụng .secure(true) để giả lập request HTTPS, kích hoạt HSTS header
        mockMvc.perform(get("/api/auth/login") 
                .secure(true) 
                .contentType(MediaType.APPLICATION_JSON))
                // Kiểm tra các header bảo mật quan trọng
                .andExpect(header().exists("X-Content-Type-Options"))
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(header().exists("X-Frame-Options"))
                .andExpect(header().string("X-Frame-Options", "DENY"))
                .andExpect(header().exists("Content-Security-Policy"))
                .andExpect(header().string("Content-Security-Policy", "default-src 'self'"))
                .andExpect(header().exists("Strict-Transport-Security")) // HTTPS Enforcement
                .andExpect(header().string("Strict-Transport-Security", "max-age=31536000 ; includeSubDomains"));
    }

    @Test
    @DisplayName("Security: CSRF Disabled cho REST API (Stateless)")
    public void testCsrfDisabledForLogin() throws Exception {
        // Với cấu hình .csrf(AbstractHttpConfigurer::disable), chúng ta có thể login
        // mà không cần gửi CSRF token. Điều này đúng với kiến trúc REST API dùng JWT.
        LoginRequest validRequest = new LoginRequest("testuser123", "Pass123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isOk()); // Login thành công nghĩa là CSRF không chặn
    }
}