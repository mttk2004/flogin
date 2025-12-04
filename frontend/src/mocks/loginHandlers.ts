// src/mocks/loginHandlers.ts
import { http, HttpResponse } from 'msw'

// Define the shape of your login request if you want type safety
interface LoginRequestBody {
  username?: string;
  password?: string;
}

export const loginHandlers = [
  // --- Login Handlers ---
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    try {
      const loginData = await request.json() as LoginRequestBody;

      // Handle successful login
      if (loginData.username === 'testuser' && loginData.password === 'password123') {
        return HttpResponse.json({
          success: true,
          message: 'Đăng nhập thành công',
          token: 'mock-token-from-msw'
        }, { status: 200 });
      }

      // Handle validation errors or other specific cases based on input
      if (!loginData.username || !loginData.password) {
        return HttpResponse.json({
          success: false,
          message: 'Username và password là bắt buộc'
        }, { status: 400 });
      }

      // Handle wrong credentials
      return HttpResponse.json({
        success: false,
        message: 'Username hoặc password không đúng'
      }, { status: 401 });

    } catch (e) {
      // Handle cases where the request body is not valid JSON
      return HttpResponse.json({
        success: false,
        message: 'Invalid request body'
      }, { status: 400 });
    }
  }),

  // Add an OPTIONS handler for preflight requests
  http.options('http://localhost:8080/api/auth/login', () => {
    return new HttpResponse(null, { status: 200 });
  }),
]
