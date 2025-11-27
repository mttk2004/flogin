// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

// Define the shape of your login request if you want type safety
interface LoginRequestBody {
  username?: string;
  password?: string;
}

export const handlers = [
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

  // --- Product Handlers (Example) ---
  http.get('http://localhost:8080/api/products', () => {
    // Return a mock list of products
    return HttpResponse.json({
      success: true,
      data: {
        products: [
          { id: 1, name: 'Mock Product 1', price: 150, quantity: 20, category: 'Electronics' },
          { id: 2, name: 'Mock Product 2', price: 250, quantity: 10, category: 'Books' },
        ],
        totalItems: 2,
        totalPages: 1,
        currentPage: 0
      }
    }, { status: 200 });
  }),

  http.get('http://localhost:8080/api/products/:id', ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json({
        success: true,
        data: { id: 1, name: 'Mock Product 1', price: 150, quantity: 20, category: 'Electronics', description: 'A detailed description.' }
      }, { status: 200 });
    }
    return HttpResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }),

  http.post('http://localhost:8080/api/products', async ({ request }) => {
    const newProduct = await request.json();
    return HttpResponse.json({
      success: true,
      data: { id: Date.now(), ...newProduct }
    }, { status: 201 });
  }),

  http.put('http://localhost:8080/api/products/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedProduct = await request.json();
    return HttpResponse.json({
      success: true,
      data: { id: Number(id), ...updatedProduct }
    }, { status: 200 });
  }),
  
  http.delete('http://localhost:8080/api/products/:id', () => {
    return HttpResponse.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    }, { status: 200 });
  }),
]
