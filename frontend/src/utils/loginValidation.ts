/**
 * Validation utilities for Login functionality
 * Implements validation rules as specified in login-requirements-analysis.md
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates username according to the following rules:
 * - Required: must not be empty or null
 * - Length: 3-50 characters (inclusive)
 * - Characters: only alphanumeric (a-z, A-Z, 0-9)
 * - No special characters allowed
 * - No spaces allowed (leading, trailing, or within)
 * - Case-sensitive
 *
 * @param username - The username to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateUsername(username: string | null | undefined): ValidationResult {
  // Check for empty/null/undefined
  if (username === null || username === undefined || username === '') {
    return {
      isValid: false,
      error: 'Username là bắt buộc'
    };
  }

  // Check for whitespace
  if (username !== username.trim() || username.includes(' ')) {
    return {
      isValid: false,
      error: 'Username chỉ được chứa chữ cái và số'
    };
  }

  // Check length - minimum
  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Username phải có ít nhất 3 ký tự'
    };
  }

  // Check length - maximum
  if (username.length > 50) {
    return {
      isValid: false,
      error: 'Username không được vượt quá 50 ký tự'
    };
  }

  // Check for valid characters (alphanumeric and ., _, -)
  const alphanumericRegex = /^[a-zA-Z0-9._-]+$/;
  if (!alphanumericRegex.test(username)) {
    return {
      isValid: false,
      error: 'Username chỉ được chứa chữ, số, và các ký tự ., _, -'
    };
  }

  // All validations passed
  return {
    isValid: true
  };
}

/**
 * Validates password according to the following rules:
 * - Required: must not be empty or null
 * - Length: 6-100 characters (inclusive)
 * - Composition: must contain BOTH letters (a-z, A-Z) AND numbers (0-9)
 * - Special characters are allowed but not required
 * - Case-sensitive
 * - Must not be only whitespace
 *
 * @param password - The password to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validatePassword(password: string | null | undefined): ValidationResult {
  // Check for empty/null/undefined
  if (password === null || password === undefined || password === '') {
    return {
      isValid: false,
      error: 'Password là bắt buộc'
    };
  }

  // Check for only whitespace
  if (password.trim() === '') {
    return {
      isValid: false,
      error: 'Password là bắt buộc'
    };
  }

  // Check length - minimum
  if (password.length < 6) {
    return {
      isValid: false,
      error: 'Password phải có ít nhất 6 ký tự'
    };
  }

  // Check length - maximum
  if (password.length > 100) {
    return {
      isValid: false,
      error: 'Password không được vượt quá 100 ký tự'
    };
  }

  // Check for letters (a-z, A-Z)
  const hasLetters = /[a-zA-Z]/.test(password);
  if (!hasLetters) {
    return {
      isValid: false,
      error: 'Password phải chứa cả chữ cái và số'
    };
  }

  // Check for numbers (0-9)
  const hasNumbers = /[0-9]/.test(password);
  if (!hasNumbers) {
    return {
      isValid: false,
      error: 'Password phải chứa cả chữ cái và số'
    };
  }

  // All validations passed
  return {
    isValid: true
  };
}

/**
 * Validates both username and password together
 * Used for form validation before submission
 *
 * @param username - The username to validate
 * @param password - The password to validate
 * @returns Object with validation results for both fields
 */
export function validateLoginForm(
  username: string | null | undefined,
  password: string | null | undefined
): {
  usernameResult: ValidationResult;
  passwordResult: ValidationResult;
  isValid: boolean;
} {
  const usernameResult = validateUsername(username);
  const passwordResult = validatePassword(password);

  return {
    usernameResult,
    passwordResult,
    isValid: usernameResult.isValid && passwordResult.isValid
  };
}
