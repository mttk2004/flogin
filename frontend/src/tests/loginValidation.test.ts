/**
 * Unit Tests for Login Validation Module
 * Testing validation.ts functions using Vitest
 *
 * Requirements from câu 2.1:
 * - Test validateUsername() với các trường hợp: rỗng, quá ngắn/dài, ký tự đặc biệt, hợp lệ
 * - Test validatePassword() với các trường hợp: rỗng, quá ngắn/dài, không chứa chữ và số, hợp lệ
 * - Đạt độ bao phủ ≥ 90%
 */

import { describe, it, expect } from 'vitest';
import { validateUsername, validatePassword, validateLoginForm } from '../utils/loginValidation';

describe('validateUsername', () => {
  describe('trường hợp username rỗng', () => {
    it('nên trả về lỗi khi username là chuỗi rỗng', () => {
      const result = validateUsername('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username là bắt buộc');
    });

    it('nên trả về lỗi khi username là null', () => {
      const result = validateUsername(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username là bắt buộc');
    });

    it('nên trả về lỗi khi username là undefined', () => {
      const result = validateUsername(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username là bắt buộc');
    });
  });

  describe('trường hợp username quá ngắn hoặc quá dài', () => {
    it('nên trả về lỗi khi username có 2 ký tự (dưới minimum)', () => {
      const result = validateUsername('ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username phải có ít nhất 3 ký tự');
    });

    it('nên trả về lỗi khi username có 1 ký tự', () => {
      const result = validateUsername('a');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username phải có ít nhất 3 ký tự');
    });

    it('nên chấp nhận username có đúng 3 ký tự (at minimum boundary)', () => {
      const result = validateUsername('abc');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username có đúng 50 ký tự (at maximum boundary)', () => {
      const username = 'a'.repeat(50); // 50 ký tự
      const result = validateUsername(username);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên trả về lỗi khi username có 51 ký tự (vượt maximum)', () => {
      const username = 'a'.repeat(51);
      const result = validateUsername(username);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username không được vượt quá 50 ký tự');
    });

    it('nên trả về lỗi khi username có 100 ký tự (vượt quá nhiều)', () => {
      const username = 'a'.repeat(100);
      const result = validateUsername(username);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username không được vượt quá 50 ký tự');
    });
  });

  describe('các ký tự đặc biệt', () => {
    it('nên trả về lỗi khi username chứa ký tự @', () => {
      const result = validateUsername('user@name');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username chỉ được chứa chữ, số, và các ký tự ., _, -');
    });

    it('nên trả về lỗi khi username chứa ký tự #', () => {
      const result = validateUsername('user#name');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username chỉ được chứa chữ, số, và các ký tự ., _, -');
    });

    it('nên chấp nhận username chứa dấu gạch ngang', () => {
      const result = validateUsername('user-name');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận username chứa dấu gạch dưới', () => {
      const result = validateUsername('user_name');
      expect(result.isValid).toBe(true);
    });

    it('nên chấp nhận username chứa dấu chấm', () => {
      const result = validateUsername('user.name');
      expect(result.isValid).toBe(true);
    });

    it('nên trả về lỗi khi username chứa khoảng trắng ở giữa', () => {
      const result = validateUsername('user name');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username chỉ được chứa chữ cái và số'); // This error comes from a different check
    });
  });

  describe('trường hợp username hợp lệ', () => {
    it('nên chấp nhận username chỉ chứa chữ thường', () => {
      const result = validateUsername('username');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username chỉ chứa chữ hoa', () => {
      const result = validateUsername('USERNAME');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username chứa cả chữ hoa và chữ thường', () => {
      const result = validateUsername('UserName');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username chỉ chứa số', () => {
      const result = validateUsername('123456');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username chứa cả chữ và số', () => {
      const result = validateUsername('user123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username hợp lệ với độ dài trung bình', () => {
      const result = validateUsername('testuser01');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username bắt đầu bằng số', () => {
      const result = validateUsername('123user');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận username kết thúc bằng số', () => {
      const result = validateUsername('user456');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('nên xử lý username là chuỗi toàn khoảng trắng', () => {
      const result = validateUsername('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Username chỉ được chứa chữ cái và số');
    });

    it('nên phân biệt chữ hoa chữ thường (case sensitive)', () => {
      // Username phải case-sensitive, cả hai nên đều valid
      const result1 = validateUsername('TestUser');
      const result2 = validateUsername('testuser');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      // Nhưng chúng là 2 username khác nhau
      expect('TestUser').not.toBe('testuser');
    });
  });
});

describe('validatePassword', () => {
  describe('trường hợp password rỗng', () => {
    it('nên trả về lỗi khi password là chuỗi rỗng', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password là bắt buộc');
    });

    it('nên trả về lỗi khi password là null', () => {
      const result = validatePassword(null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password là bắt buộc');
    });

    it('nên trả về lỗi khi password là undefined', () => {
      const result = validatePassword(undefined);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password là bắt buộc');
    });

    it('nên trả về lỗi khi password chỉ chứa khoảng trắng', () => {
      const result = validatePassword('     ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password là bắt buộc');
    });
  });

  describe('trường hợp password quá ngắn hoặc quá dài', () => {
    it('nên trả về lỗi khi password có 5 ký tự (dưới minimum)', () => {
      const result = validatePassword('abc12');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải có ít nhất 6 ký tự');
    });

    it('nên trả về lỗi khi password có 1 ký tự', () => {
      const result = validatePassword('a');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải có ít nhất 6 ký tự');
    });

    it('nên chấp nhận password có đúng 6 ký tự (at minimum boundary)', () => {
      const result = validatePassword('abc123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password có đúng 100 ký tự (at maximum boundary)', () => {
      // Tạo password 100 ký tự có cả chữ và số
      const password = 'a'.repeat(95) + '12345'; // 95 chữ + 5 số = 100
      const result = validatePassword(password);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên trả về lỗi khi password có 101 ký tự (vượt maximum)', () => {
      const password = 'a'.repeat(96) + '12345'; // 96 chữ + 5 số = 101
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password không được vượt quá 100 ký tự');
    });

    it('nên trả về lỗi khi password có 200 ký tự (vượt quá nhiều)', () => {
      const password = 'a'.repeat(195) + '12345'; // 195 chữ + 5 số = 200
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password không được vượt quá 100 ký tự');
    });
  });

  describe('password không chứa cả chữ và số', () => {
    it('nên trả về lỗi khi password chỉ chứa chữ cái', () => {
      const result = validatePassword('Password');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chỉ chứa chữ thường', () => {
      const result = validatePassword('password');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chỉ chứa chữ hoa', () => {
      const result = validatePassword('PASSWORD');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chỉ chứa số', () => {
      const result = validatePassword('123456');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chỉ chứa ký tự đặc biệt', () => {
      const result = validatePassword('!@#$%^');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chứa ký tự đặc biệt và số nhưng không có chữ', () => {
      const result = validatePassword('!@#123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });

    it('nên trả về lỗi khi password chứa ký tự đặc biệt và chữ nhưng không có số', () => {
      const result = validatePassword('Pass!@#');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password phải chứa cả chữ cái và số');
    });
  });

  describe('trường hợp password hợp lệ', () => {
    it('nên chấp nhận password chứa chữ thường và số', () => {
      const result = validatePassword('pass123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password chứa chữ hoa và số', () => {
      const result = validatePassword('PASS123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password chứa cả chữ hoa, chữ thường và số', () => {
      const result = validatePassword('Pass123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password có ký tự đặc biệt với chữ và số', () => {
      const result = validatePassword('Pass@123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password phức tạp', () => {
      const result = validatePassword('MyP@ssw0rd!');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password với nhiều ký tự đặc biệt', () => {
      const result = validatePassword('Test!@#$123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password có khoảng trắng (nếu có cả chữ và số)', () => {
      const result = validatePassword('Pass 123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password bắt đầu bằng số', () => {
      const result = validatePassword('123Pass');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password kết thúc bằng số', () => {
      const result = validatePassword('Pass456');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên chấp nhận password ở độ dài trung bình', () => {
      const result = validatePassword('Test1234567890');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('nên phân biệt chữ hoa chữ thường (case sensitive)', () => {
      const result1 = validatePassword('Pass123');
      const result2 = validatePassword('pass123');
      expect(result1.isValid).toBe(true);
      expect(result2.isValid).toBe(true);
      // Nhưng chúng là 2 password khác nhau
      expect('Pass123').not.toBe('pass123');
    });

    it('nên xử lý password có tab character', () => {
      const result = validatePassword('Pass\t123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('nên xử lý password có newline character', () => {
      const result = validatePassword('Pass\n123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});

describe('validateLoginForm', () => {
  describe('cả username và password hợp lệ', () => {
    it('nên trả về isValid: true khi cả hai đều hợp lệ', () => {
      const result = validateLoginForm('testuser123', 'Pass123');
      expect(result.isValid).toBe(true);
      expect(result.usernameResult.isValid).toBe(true);
      expect(result.passwordResult.isValid).toBe(true);
      expect(result.usernameResult.error).toBeUndefined();
      expect(result.passwordResult.error).toBeUndefined();
    });
  });

  describe('một trong hai hoặc cả hai không hợp lệ', () => {
    it('nên trả về isValid: false khi username không hợp lệ', () => {
      const result = validateLoginForm('ab', 'Pass123');
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(false);
      expect(result.passwordResult.isValid).toBe(true);
      expect(result.usernameResult.error).toBeDefined();
    });

    it('nên trả về isValid: false khi password không hợp lệ', () => {
      const result = validateLoginForm('testuser123', 'short');
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(true);
      expect(result.passwordResult.isValid).toBe(false);
      expect(result.passwordResult.error).toBeDefined();
    });

    it('nên trả về isValid: false khi cả hai đều không hợp lệ', () => {
      const result = validateLoginForm('ab', 'short');
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(false);
      expect(result.passwordResult.isValid).toBe(false);
      expect(result.usernameResult.error).toBeDefined();
      expect(result.passwordResult.error).toBeDefined();
    });

    it('nên trả về isValid: false khi cả hai đều trống', () => {
      const result = validateLoginForm('', '');
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.error).toBe('Username là bắt buộc');
      expect(result.passwordResult.error).toBe('Password là bắt buộc');
    });
  });

  describe('null và undefined handling', () => {
    it('nên xử lý null values', () => {
      const result = validateLoginForm(null, null);
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(false);
      expect(result.passwordResult.isValid).toBe(false);
    });

    it('nên xử lý undefined values', () => {
      const result = validateLoginForm(undefined, undefined);
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(false);
      expect(result.passwordResult.isValid).toBe(false);
    });

    it('nên xử lý mixed null và string', () => {
      const result = validateLoginForm(null, 'Pass123');
      expect(result.isValid).toBe(false);
      expect(result.usernameResult.isValid).toBe(false);
      expect(result.passwordResult.isValid).toBe(true);
    });
  });
});
