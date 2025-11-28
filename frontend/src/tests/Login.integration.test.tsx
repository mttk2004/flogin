// THIS IS NOW A TRUE INTEGRATION TEST
// It tests the integration of the Component -> Service -> Network Layer (mocked by MSW)

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from '../components/Login';

// Note: There is NO vi.mock() here.
// The test setup in `setup.ts` starts the MSW server,
// which will intercept the actual network requests made by authService.

describe('Login Component Integration Test', () => {

  it('should render the login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should successfully log in and display a success message with valid credentials', async () => {
    render(<Login />);

    // Simulate user typing valid credentials
    // These match the credentials defined in our MSW handler (src/mocks/handlers.ts)
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    // The component will now call the real authService, which makes a real network request.
    // MSW intercepts this request and returns the 200 OK response we defined.
    // We wait for the UI to update with the success message.
    await waitFor(() => {
      expect(screen.getByText('Đăng nhập thành công')).toBeInTheDocument();
    });

    // The button should be re-enabled after completion
    expect(screen.getByRole('button', { name: /đăng nhập/i })).not.toBeDisabled();
  });

  it('should display an error message with invalid credentials', async () => {
    render(<Login />);

    // Simulate user typing invalid credentials
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpass' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));

    // MSW will intercept the network request and return the 401 Unauthorized response.
    // We wait for the UI to update with the error message from the API.
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Username hoặc password không đúng');
    });

    // The button should be re-enabled after the error
    expect(screen.getByRole('button', { name: /đăng nhập/i })).not.toBeDisabled();
  });

  // Note: This test is commented out because the Login component relies on native HTML5 'required' attribute validation,
  // which prevents the form from submitting if fields are empty.
  // The component's handleSubmit function (and thus API call) is not triggered for empty required fields.
  // If client-side JavaScript validation were implemented in the component, this test would be valid.
  // it('should display an API-returned validation error for empty submission', async () => {
  //   render(<Login />);
  //   fireEvent.click(screen.getByRole('button', { name: /đăng nhập/i }));
  //   await waitFor(() => {
  //     expect(screen.getByRole('alert')).toHaveTextContent('Username và password là bắt buộc');
  //   });
  //   expect(screen.getByRole('button', { name: /đăng nhập/i })).not.toBeDisabled();
  // });
});