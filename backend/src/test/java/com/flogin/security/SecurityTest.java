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
        // Mô tả: Kiểm tra xem ứng dụng có chống lại được tấn công SQL Injection thông qua trường username không.
        // Tình huống tấn công: Gửi một username chứa cú pháp SQL Injection phổ biến (' OR '1'='1).
        // Kết quả mong đợi: Ứng dụng phải từ chối yêu cầu này, thường là trả về trạng thái 400 Bad Request (do validation đầu vào)
        //                   hoặc 401 Unauthorized (do thông tin đăng nhập sai/không hợp lệ về mặt logic).
        //                   Tuyệt đối không được trả về 200 OK vì điều đó có nghĩa là đã bỏ qua bước xác thực.
        LoginRequest attackRequest = new LoginRequest("admin' OR '1'='1", "password");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attackRequest)))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    @DisplayName("Security: Ngăn chặn truy cập trái phép (Auth Bypass)")
    public void testPreventUnauthorizedAccess() throws Exception {
        // Mô tả: Kiểm tra xem ứng dụng có ngăn chặn người dùng không được ủy quyền truy cập vào các tài nguyên yêu cầu quyền hạn cao hơn không.
        // Tình huống tấn công: Cố gắng thực hiện một hành động yêu cầu quyền ADMIN (ví dụ: xóa sản phẩm) mà không cung cấp token xác thực hợp lệ
        //                      hoặc với một token của người dùng không có quyền.
        // Kết quả mong đợi: Ứng dụng phải trả về trạng thái 403 Forbidden (người dùng không có quyền truy cập) hoặc 401 Unauthorized (người dùng chưa xác thực).
        //                   Điều này cho thấy cơ chế kiểm soát truy cập đang hoạt động đúng.
        mockMvc.perform(delete("/api/products/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden()); 
    }
    
    @Test
    @DisplayName("Security: Kiểm tra Input Validation (XSS Prevention)")
    public void testInputSanitization() throws Exception {
        // Mô tả: Kiểm tra xem ứng dụng có thực hiện làm sạch dữ liệu đầu vào để ngăn chặn tấn công Cross-Site Scripting (XSS) không.
        // Tình huống tấn công: Gửi một chuỗi chứa mã độc hại (<script>alert(1)</script>) vào một trường nhập liệu (ví dụ: username).
        // Kết quả mong đợi: Ứng dụng phải chặn hoặc làm sạch chuỗi này, thường là trả về trạng thái 400 Bad Request
        //                   do validation đầu vào không cho phép các ký tự hoặc cấu trúc HTML/script.
        LoginRequest xssRequest = new LoginRequest("<script>alert(1)</script>", "password");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(xssRequest)))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    @DisplayName("Security: Kiểm tra Security Headers (Best Practices)")
    public void testSecurityHeaders() throws Exception {
        // Mô tả: Kiểm tra xem ứng dụng có cấu hình và gửi các HTTP Security Headers quan trọng để tăng cường bảo mật trình duyệt không.
        // Tình huống kiểm tra: Gửi một yêu cầu GET đến một endpoint (ví dụ: /api/auth/login), giả lập truy cập qua HTTPS (`.secure(true)`).
        // Kết quả mong đợi:
        //   - X-Content-Type-Options: "nosniff" -> Ngăn chặn trình duyệt "đoán" kiểu MIME của nội dung.
        //   - X-Frame-Options: "DENY" -> Ngăn chặn ứng dụng bị nhúng trong iframe để tránh tấn công Clickjacking.
        //   - Content-Security-Policy (CSP): "default-src 'self'" -> Chỉ cho phép tải tài nguyên từ cùng một nguồn gốc, giảm thiểu XSS.
        //   - Strict-Transport-Security (HSTS): "max-age=...; includeSubDomains" -> Buộc trình duyệt chỉ giao tiếp qua HTTPS trong một khoảng thời gian nhất định, chống lại tấn công hạ cấp (downgrade attacks).
        mockMvc.perform(get("/api/auth/login") 
                .secure(true) 
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(header().exists("X-Content-Type-Options"))
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(header().exists("X-Frame-Options"))
                .andExpect(header().string("X-Frame-Options", "DENY"))
                .andExpect(header().exists("Content-Security-Policy"))
                .andExpect(header().string("Content-Security-Policy", "default-src 'self'"))
                .andExpect(header().exists("Strict-Transport-Security"))
                .andExpect(header().string("Strict-Transport-Security", "max-age=31536000 ; includeSubDomains"));
    }

    @Test
    @DisplayName("Security: CSRF Disabled cho REST API (Stateless)")
    public void testCsrfDisabledForLogin() throws Exception {
        // Mô tả: Kiểm tra xác nhận rằng CSRF protection đã được vô hiệu hóa cho REST API, điều này phù hợp với kiến trúc sử dụng JWT.
        // Tình huống kiểm tra: Gửi yêu cầu đăng nhập hợp lệ mà không cần kèm theo CSRF token.
        // Kết quả mong đợi: Yêu cầu đăng nhập phải thành công (trả về 200 OK). Nếu CSRF không bị vô hiệu hóa, yêu cầu này sẽ bị từ chối
        //                   vì thiếu CSRF token, không phù hợp với REST API sử dụng JWT (vì JWT tự nó đã mang tính bảo mật chống CSRF).
        LoginRequest validRequest = new LoginRequest("testuser123", "Pass123");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isOk()); 
    }
}