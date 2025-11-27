package unit;

import com.flogin.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Nested;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit Tests for AuthService
 * Testing authentication and validation methods using JUnit 5
 *
 * Requirements from câu 2.1:
 * - Test authenticate() với các kịch bản: login thành công, username không tồn
 * tại, password sai, validation errors
 * - Test các phương thức validation riêng lẻ
 * - Đạt độ bao phủ ≥ 85%
 */
@DisplayName("AuthService Unit Tests")
class AuthServiceTest {

  private AuthService authService;

  @BeforeEach
  void setUp() {
    authService = new AuthService();
  }

  // ===========================
  // VALIDATE USERNAME TESTS
  // ===========================

  @Nested
  @DisplayName("validateUsername() Tests")
  class ValidateUsernameTests {

    @Nested
    @DisplayName("Trường hợp username rỗng")
    class EmptyUsernameTests {

      @Test
      @DisplayName("Nên trả về lỗi khi username là chuỗi rỗng")
      void shouldReturnErrorWhenUsernameIsEmpty() {
        AuthService.ValidationResult result = authService.validateUsername("");
        assertFalse(result.isValid());
        assertEquals("Username là bắt buộc", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi username là null")
      void shouldReturnErrorWhenUsernameIsNull() {
        AuthService.ValidationResult result = authService.validateUsername(null);
        assertFalse(result.isValid());
        assertEquals("Username là bắt buộc", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi username chỉ chứa khoảng trắng")
      void shouldReturnErrorWhenUsernameIsWhitespace() {
        AuthService.ValidationResult result = authService.validateUsername("   ");
        assertFalse(result.isValid());
        assertEquals("Username là bắt buộc", result.getError());
      }
    }

    @Nested
    @DisplayName("Trường hợp username quá ngắn hoặc quá dài")
    class UsernameLengthTests {

      @Test
      @DisplayName("Nên trả về lỗi khi username có 2 ký tự (dưới minimum)")
      void shouldReturnErrorWhenUsernameTooShort() {
        AuthService.ValidationResult result = authService.validateUsername("ab");
        assertFalse(result.isValid());
        assertEquals("Username phải có ít nhất 3 ký tự", result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username có đúng 3 ký tự (at minimum boundary)")
      void shouldAcceptUsernameAtMinimumLength() {
        AuthService.ValidationResult result = authService.validateUsername("abc");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username có đúng 50 ký tự (at maximum boundary)")
      void shouldAcceptUsernameAtMaximumLength() {
        String username = "a".repeat(50);
        AuthService.ValidationResult result = authService.validateUsername(username);
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi username có 51 ký tự (vượt maximum)")
      void shouldReturnErrorWhenUsernameTooLong() {
        String username = "a".repeat(51);
        AuthService.ValidationResult result = authService.validateUsername(username);
        assertFalse(result.isValid());
        assertEquals("Username không được vượt quá 50 ký tự", result.getError());
      }
    }

    @Nested
    @DisplayName("Các ký tự đặc biệt")
    class InvalidCharactersTests {

      @Test
      @DisplayName("Nên trả về lỗi khi username chứa ký tự @")
      void shouldReturnErrorWhenUsernameContainsAtSymbol() {
        AuthService.ValidationResult result = authService.validateUsername("user@name");
        assertFalse(result.isValid());
        assertEquals("Username chỉ được chứa chữ, số, và các ký tự ., _, -", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi username chứa khoảng trắng")
      void shouldReturnErrorWhenUsernameContainsSpace() {
        AuthService.ValidationResult result = authService.validateUsername("user name");
        // This fails the regex check because the regex doesn't include space
        assertFalse(result.isValid());
        assertEquals("Username chỉ được chứa chữ, số, và các ký tự ., _, -", result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username chứa dấu gạch dưới")
      void shouldAcceptUsernameWithUnderscore() {
        AuthService.ValidationResult result = authService.validateUsername("user_name");
        assertTrue(result.isValid());
      }

      @Test
      @DisplayName("Nên chấp nhận username chứa dấu chấm")
      void shouldAcceptUsernameWithDot() {
        AuthService.ValidationResult result = authService.validateUsername("user.name");
        assertTrue(result.isValid());
      }

      @Test
      @DisplayName("Nên chấp nhận username chứa dấu gạch ngang")
      void shouldAcceptUsernameWithHyphen() {
        AuthService.ValidationResult result = authService.validateUsername("user-name");
        assertTrue(result.isValid());
      }
    }

    @Nested
    @DisplayName("Trường hợp username hợp lệ")
    class ValidUsernameTests {

      @Test
      @DisplayName("Nên chấp nhận username chỉ chứa chữ thường")
      void shouldAcceptUsernameLowercase() {
        AuthService.ValidationResult result = authService.validateUsername("username");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username chỉ chứa chữ hoa")
      void shouldAcceptUsernameUppercase() {
        AuthService.ValidationResult result = authService.validateUsername("USERNAME");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username chứa cả chữ và số")
      void shouldAcceptUsernameAlphanumeric() {
        AuthService.ValidationResult result = authService.validateUsername("user123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận username chỉ chứa số")
      void shouldAcceptUsernameNumericOnly() {
        AuthService.ValidationResult result = authService.validateUsername("123456");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }
    }
  }

  // ===========================
  // VALIDATE PASSWORD TESTS
  // ===========================

  @Nested
  @DisplayName("validatePassword() Tests")
  class ValidatePasswordTests {

    @Nested
    @DisplayName("Trường hợp password rỗng")
    class EmptyPasswordTests {

      @Test
      @DisplayName("Nên trả về lỗi khi password là chuỗi rỗng")
      void shouldReturnErrorWhenPasswordIsEmpty() {
        AuthService.ValidationResult result = authService.validatePassword("");
        assertFalse(result.isValid());
        assertEquals("Password là bắt buộc", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password là null")
      void shouldReturnErrorWhenPasswordIsNull() {
        AuthService.ValidationResult result = authService.validatePassword(null);
        assertFalse(result.isValid());
        assertEquals("Password là bắt buộc", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password chỉ chứa khoảng trắng")
      void shouldReturnErrorWhenPasswordIsWhitespace() {
        AuthService.ValidationResult result = authService.validatePassword("     ");
        assertFalse(result.isValid());
        assertEquals("Password là bắt buộc", result.getError());
      }
    }

    @Nested
    @DisplayName("Trường hợp password quá ngắn hoặc quá dài")
    class PasswordLengthTests {

      @Test
      @DisplayName("Nên trả về lỗi khi password có 5 ký tự (dưới minimum)")
      void shouldReturnErrorWhenPasswordTooShort() {
        AuthService.ValidationResult result = authService.validatePassword("abc12");
        assertFalse(result.isValid());
        assertEquals("Password phải có ít nhất 6 ký tự", result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password có đúng 6 ký tự (at minimum boundary)")
      void shouldAcceptPasswordAtMinimumLength() {
        AuthService.ValidationResult result = authService.validatePassword("abc123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password có đúng 100 ký tự (at maximum boundary)")
      void shouldAcceptPasswordAtMaximumLength() {
        String password = "a".repeat(95) + "12345"; // 95 letters + 5 numbers = 100
        AuthService.ValidationResult result = authService.validatePassword(password);
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password có 101 ký tự (vượt maximum)")
      void shouldReturnErrorWhenPasswordTooLong() {
        String password = "a".repeat(96) + "12345"; // 96 letters + 5 numbers = 101
        AuthService.ValidationResult result = authService.validatePassword(password);
        assertFalse(result.isValid());
        assertEquals("Password không được vượt quá 100 ký tự", result.getError());
      }
    }

    @Nested
    @DisplayName("Password không chứa cả chữ và số")
    class PasswordCompositionTests {

      @Test
      @DisplayName("Nên trả về lỗi khi password chỉ chứa chữ cái")
      void shouldReturnErrorWhenPasswordOnlyLetters() {
        AuthService.ValidationResult result = authService.validatePassword("Password");
        assertFalse(result.isValid());
        assertEquals("Password phải chứa cả chữ cái và số", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password chỉ chứa số")
      void shouldReturnErrorWhenPasswordOnlyNumbers() {
        AuthService.ValidationResult result = authService.validatePassword("123456");
        assertFalse(result.isValid());
        assertEquals("Password phải chứa cả chữ cái và số", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password chỉ chứa ký tự đặc biệt")
      void shouldReturnErrorWhenPasswordOnlySpecialChars() {
        AuthService.ValidationResult result = authService.validatePassword("!@#$%^");
        assertFalse(result.isValid());
        assertEquals("Password phải chứa cả chữ cái và số", result.getError());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password có số và ký tự đặc biệt nhưng không có chữ")
      void shouldReturnErrorWhenPasswordNumbersAndSpecialCharsOnly() {
        AuthService.ValidationResult result = authService.validatePassword("123!@#");
        assertFalse(result.isValid());
        assertEquals("Password phải chứa cả chữ cái và số", result.getError());
      }
    }

    @Nested
    @DisplayName("Trường hợp password hợp lệ")
    class ValidPasswordTests {

      @Test
      @DisplayName("Nên chấp nhận password chứa chữ thường và số")
      void shouldAcceptPasswordWithLowercaseAndNumbers() {
        AuthService.ValidationResult result = authService.validatePassword("pass123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password chứa chữ hoa và số")
      void shouldAcceptPasswordWithUppercaseAndNumbers() {
        AuthService.ValidationResult result = authService.validatePassword("PASS123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password chứa cả chữ hoa, chữ thường và số")
      void shouldAcceptPasswordWithMixedCase() {
        AuthService.ValidationResult result = authService.validatePassword("Pass123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password có ký tự đặc biệt với chữ và số")
      void shouldAcceptPasswordWithSpecialChars() {
        AuthService.ValidationResult result = authService.validatePassword("Pass@123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password phức tạp")
      void shouldAcceptComplexPassword() {
        AuthService.ValidationResult result = authService.validatePassword("MyP@ssw0rd!");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }

      @Test
      @DisplayName("Nên chấp nhận password có khoảng trắng (nếu có cả chữ và số)")
      void shouldAcceptPasswordWithSpaces() {
        AuthService.ValidationResult result = authService.validatePassword("Pass 123");
        assertTrue(result.isValid());
        assertNull(result.getError());
      }
    }
  }

  // ===========================
  // AUTHENTICATE TESTS
  // ===========================

  @Nested
  @DisplayName("authenticate() Tests")
  class AuthenticateTests {

    @Nested
    @DisplayName("Login thành công")
    class LoginSuccessTests {

      @Test
      @DisplayName("Nên xác thực thành công với credentials hợp lệ")
      void shouldAuthenticateSuccessfullyWithValidCredentials() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "Pass123");

        assertTrue(result.isSuccess());
        assertNotNull(result.getToken());
        assertEquals("Đăng nhập thành công", result.getMessage());
      }
    }

    @Nested
    @DisplayName("Login thất bại với username không tồn tại")
    class UsernameNotFoundTests {

      @Test
      @DisplayName("Nên trả về lỗi khi username không tồn tại")
      void shouldReturnErrorWhenUsernameNotFound() {
        AuthService.AuthenticationResult result = authService.authenticate("nonexistent", "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username không tồn tại", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi username khác đúng password")
      void shouldReturnErrorWhenUsernameWrongButPasswordCorrect() {
        AuthService.AuthenticationResult result = authService.authenticate("wronguser", "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username không tồn tại", result.getMessage());
      }
    }

    @Nested
    @DisplayName("Login thất bại với password sai")
    class WrongPasswordTests {

      @Test
      @DisplayName("Nên trả về lỗi khi password không đúng")
      void shouldReturnErrorWhenPasswordWrong() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "WrongPass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password không đúng", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi khi password gần đúng nhưng sai chữ hoa thường")
      void shouldReturnErrorWhenPasswordCaseWrong() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password không đúng", result.getMessage());
      }
    }

    @Nested
    @DisplayName("Các lỗi về validation")
    class ValidationErrorsTests {

      @Test
      @DisplayName("Nên trả về lỗi validation khi username rỗng")
      void shouldReturnValidationErrorWhenUsernameEmpty() {
        AuthService.AuthenticationResult result = authService.authenticate("", "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username là bắt buộc", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi username null")
      void shouldReturnValidationErrorWhenUsernameNull() {
        AuthService.AuthenticationResult result = authService.authenticate(null, "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username là bắt buộc", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi password rỗng")
      void shouldReturnValidationErrorWhenPasswordEmpty() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password là bắt buộc", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi password null")
      void shouldReturnValidationErrorWhenPasswordNull() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", null);

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password là bắt buộc", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi username quá ngắn")
      void shouldReturnValidationErrorWhenUsernameTooShort() {
        AuthService.AuthenticationResult result = authService.authenticate("ab", "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username phải có ít nhất 3 ký tự", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi username có ký tự đặc biệt")
      void shouldReturnValidationErrorWhenUsernameHasSpecialChars() {
        AuthService.AuthenticationResult result = authService.authenticate("test@user", "Pass123");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Username chỉ được chứa chữ, số, và các ký tự ., _, -", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi password quá ngắn")
      void shouldReturnValidationErrorWhenPasswordTooShort() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "Ps1");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password phải có ít nhất 6 ký tự", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi password không có số")
      void shouldReturnValidationErrorWhenPasswordNoNumbers() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "Password");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password phải chứa cả chữ cái và số", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi password không có chữ")
      void shouldReturnValidationErrorWhenPasswordNoLetters() {
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "123456");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        assertEquals("Password phải chứa cả chữ cái và số", result.getMessage());
      }

      @Test
      @DisplayName("Nên trả về lỗi validation khi cả username và password đều không hợp lệ")
      void shouldReturnValidationErrorWhenBothInvalid() {
        AuthService.AuthenticationResult result = authService.authenticate("", "");

        assertFalse(result.isSuccess());
        assertNull(result.getToken());
        // Username được kiểm tra trước, nên trả về lỗi username
        assertEquals("Username là bắt buộc", result.getMessage());
      }
    }

    @Nested
    @DisplayName("Edge cases")
    class EdgeCaseTests {

      @Test
      @DisplayName("Nên xử lý username hợp lệ ở độ dài tối thiểu")
      void shouldHandleMinimumValidUsername() {
        // Username tối thiểu 3 ký tự
        AuthService.AuthenticationResult result = authService.authenticate("abc", "Pass123");

        // Sẽ fail vì username không match "testuser123"
        assertFalse(result.isSuccess());
        assertEquals("Username không tồn tại", result.getMessage());
      }

      @Test
      @DisplayName("Nên xử lý password hợp lệ ở độ dài tối thiểu")
      void shouldHandleMinimumValidPassword() {
        // Password tối thiểu 6 ký tự với chữ và số
        AuthService.AuthenticationResult result = authService.authenticate("testuser123", "abc123");

        // Sẽ fail vì password không match "Pass123"
        assertFalse(result.isSuccess());
        assertEquals("Password không đúng", result.getMessage());
      }
    }
  }
}
