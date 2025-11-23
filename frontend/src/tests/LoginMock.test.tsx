import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../components/Login';
import * as authService from '../services/authService';

// Mock authService
vi.mock('../services/authService', () => ({
  login: vi.fn(),
}));

describe('Login Component Mocking Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Test với các phản hồi giả lập (mocked responses) cho trường hợp thành công
  it('should handle successful login with mocked response', async () => {
    // Mock successful response
    const mockSuccessResponse = {
      success: true,
      message: 'Đăng nhập thành công',
      token: 'mock-token-123'
    };
    
    // Setup the mock to return success
    (authService.login as any).mockResolvedValue(mockSuccessResponse);

    render(<Login />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validPass123' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    // Verify mock call and UI update
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('validUser', 'validPass123');
      expect(screen.getByText('Đăng nhập thành công')).toBeInTheDocument();
    });
  });

  // 1. Test với các phản hồi giả lập (mocked responses) cho trường hợp thất bại
  it('should handle failed login with mocked error response', async () => {
    // Mock error response
    const mockErrorResponse = {
      success: false,
      message: 'Invalid credentials'
    };

    // Setup the mock to return error
    (authService.login as any).mockRejectedValue(mockErrorResponse);

    render(<Login />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongPass' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    // Verify mock call and UI error
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('wrongUser', 'wrongPass');
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
    });
  });

  // 1. Verify mock calls
  it('should call authService.login with correct arguments', async () => {
    (authService.login as any).mockResolvedValue({});

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'userToCheck' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'passToCheck' } });
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      // Verify call arguments
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith('userToCheck', 'passToCheck');
    });
  });
});
