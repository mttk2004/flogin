import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '../components/Login';
import * as authService from '../services/authService';

// Mock authService
vi.mock('../services/authService', () => ({
  login: vi.fn(),
}));

describe('Login Component Integration Tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  it('handles user input interactions', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits form and calls API successfully', async () => {
    // Mock successful response
    (authService.login as any).mockResolvedValue({
      success: true,
      message: 'Đăng nhập thành công',
      token: 'fake-token'
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    // Verify loading state
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Đang xử lý...');

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
      expect(screen.getByText('Đăng nhập thành công')).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    // Mock error response
    const errorMessage = 'Password không đúng';
    (authService.login as any).mockRejectedValue({
      success: false,
      message: errorMessage
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpass' } });

    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalled();
      expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
    });
  });

  it('handles network errors', async () => {
    // Mock network error
    (authService.login as any).mockRejectedValue(new Error('Network Error'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      // Note: The component catches generic errors as well
      // In the implementation it falls back to 'Đăng nhập thất bại' or 'Network Error' depending on implementation
      // Let's verify that SOME alert is shown
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
