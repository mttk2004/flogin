package mock;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.controller.AuthController;
import com.flogin.dto.LoginRequest;
import com.flogin.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.flogin.FloginApplication;
import org.springframework.boot.test.context.SpringBootTest;

@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@org.springframework.test.context.ContextConfiguration(classes = FloginApplication.class)
public class AuthServiceMockTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Test Controller with Mocked Service - Login Success")
    public void testLoginSuccessWithMock() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("testuser", "password123");
        AuthService.AuthenticationResult mockResult = new AuthService.AuthenticationResult(
                true, "mock-token-xyz", "Đăng nhập thành công");

        when(authService.authenticate("testuser", "password123")).thenReturn(mockResult);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").value("mock-token-xyz"))
                .andExpect(jsonPath("$.message").value("Đăng nhập thành công"));

        // Verify mock interaction
        verify(authService).authenticate("testuser", "password123");
    }

    @Test
    @DisplayName("Test Controller with Mocked Service - Login Failure")
    public void testLoginFailureWithMock() throws Exception {
        // Arrange
        LoginRequest request = new LoginRequest("testuser", "wrongpass");
        AuthService.AuthenticationResult mockResult = new AuthService.AuthenticationResult(
                false, null, "Password không đúng");

        when(authService.authenticate("testuser", "wrongpass")).thenReturn(mockResult);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Password không đúng"));

        // Verify mock interaction
        verify(authService).authenticate("testuser", "wrongpass");
    }
}
