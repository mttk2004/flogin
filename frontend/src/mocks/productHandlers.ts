// src/mocks/productHandlers.ts
import { http, HttpResponse } from 'msw'

export const productHandlers = [
  // --- Product Handlers ---
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
