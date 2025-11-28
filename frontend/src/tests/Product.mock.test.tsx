import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import * as productService from '../services/productService';

// Mock the entire product service for all tests in this file
vi.mock('../services/productService', () => ({
  productService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Product Components Mock Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- ProductList Mock Tests ---
  describe('ProductList Component', () => {
    it('renders product list correctly from mock', async () => {
      const mockProducts = {
        products: [{ id: 1, name: 'Product 1', price: 100, quantity: 10, category: 'Electronics' }],
      };
      (productService.productService.getAll as any).mockResolvedValue(mockProducts);

      render(<ProductList />);
      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
      });
      expect(productService.productService.getAll).toHaveBeenCalledTimes(1);
    });

    it('handles delete product with mock', async () => {
      const mockProducts = {
        products: [{ id: 1, name: 'Product 1', price: 100, quantity: 10, category: 'Electronics' }],
      };
      (productService.productService.getAll as any).mockResolvedValue(mockProducts);
      (productService.productService.delete as any).mockResolvedValue({});
      vi.spyOn(window, 'confirm').mockImplementation(() => true);

      render(<ProductList />);
      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Xóa'));

      await waitFor(() => {
        expect(productService.productService.delete).toHaveBeenCalledWith(1);
      });
    });
  });

  // --- ProductForm Mock Tests ---
  describe('ProductForm Component', () => {
    it('submits new product successfully with mock', async () => {
      const onSuccess = vi.fn();
      (productService.productService.create as any).mockResolvedValue({});

      render(<ProductForm onSuccess={onSuccess} />);
      fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'New Product' } });
      fireEvent.change(screen.getByLabelText('Giá'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('Số lượng'), { target: { value: '10' } });
      fireEvent.change(screen.getByLabelText('Danh mục'), { target: { value: 'Electronics' } });
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        expect(productService.productService.create).toHaveBeenCalledWith(expect.anything());
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it('updates existing product successfully with mock', async () => {
        const onSuccess = vi.fn();
        const product = { id: 1, name: 'Old', price: 10, quantity: 1, category: 'Test', description: '' };
        (productService.productService.update as any).mockResolvedValue({});

        render(<ProductForm product={product} onSuccess={onSuccess} />);
        fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'Updated' } });
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(productService.productService.update).toHaveBeenCalledWith(1, expect.objectContaining({ name: 'Updated' }));
        });
    });
  });

  // --- ProductDetail Mock Tests ---
  describe('ProductDetail Component', () => {
    it('renders product detail correctly from mock', async () => {
      const mockProduct = {
        id: 1, name: 'Detail Product', price: 500, quantity: 5, category: 'Test', description: 'Desc',
      };
      (productService.productService.getById as any).mockResolvedValue(mockProduct);

      render(<ProductDetail productId={1} />);
      await waitFor(() => {
        expect(screen.getByText('Detail Product')).toBeInTheDocument();
      });
      expect(productService.productService.getById).toHaveBeenCalledWith(1);
    });

    it('displays error when product not found via mock', async () => {
      (productService.productService.getById as any).mockRejectedValue(new Error('Not Found'));
      render(<ProductDetail productId={999} />);
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent('Not Found');
      });
    });
  });
});