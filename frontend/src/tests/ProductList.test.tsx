// True Integration Test for ProductList
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductList from '../components/ProductList';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// No vi.mock() here! We are relying on the MSW server.

describe('ProductList Integration Test', () => {
  it('should fetch and display a list of products', async () => {
    // The handler in src/mocks/handlers.ts will catch this.
    render(<ProductList />);

    // Check for loading state first
    expect(screen.getByText('Đang tải...')).toBeInTheDocument();

    // Wait for the products to be displayed
    await waitFor(() => {
      // These values come from the 'GET /api/products' handler in handlers.ts
      expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
      expect(screen.getByText('Mock Product 2')).toBeInTheDocument();
    });
  });

  it('should handle server error when fetching products', async () => {
    // Override the default handler for this specific test to return an error
    server.use(
      http.get('http://localhost:8080/api/products', () => {
        return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      })
    );

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Internal Server Error');
    });
  });
});