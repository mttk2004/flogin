// True Integration Test for ProductDetail
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDetail from '../components/ProductDetail';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// No vi.mock() here!

describe('ProductDetail Integration Test', () => {
  it('should fetch and display product details from the API', async () => {
    // The default handler in `handlers.ts` for GET /api/products/1 will be used.
    render(<ProductDetail productId={1} />);

    // Wait for the API call to resolve and the component to re-render
    await waitFor(() => {
      // These values come from the 'GET /api/products/:id' handler in handlers.ts
      expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
      // Use a regex for partial match since the text is split across nodes
      expect(screen.getByText(/A detailed description/i)).toBeInTheDocument();
    });
  });

  it('should display an error message if the product is not found', async () => {
    // We can use server.use() to override the default handler for this one test
    server.use(
      http.get('http://localhost:8080/api/products/999', () => {
        return HttpResponse.json({ message: 'Sản phẩm không tồn tại' }, { status: 404 });
      })
    );

    render(<ProductDetail productId={999} />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Sản phẩm không tồn tại');
    });
  });
});