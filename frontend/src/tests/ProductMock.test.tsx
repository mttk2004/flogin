import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import * as productService from '../services/productService';

// 1.a) Mock ProductService
vi.mock('../services/productService', () => ({
    productService: {
        getAll: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
    }
}));

describe('Product Mocking Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('ProductList Component Mocking', () => {
        // 1.b) Test success scenario (Read all)
        it('should fetch and display products using mocked service', async () => {
            const mockResponse = {
                products: [
                    { id: 1, name: 'Mock Product 1', price: 100, quantity: 10, category: 'Test' }
                ]
            };
            (productService.productService.getAll as any).mockResolvedValue(mockResponse);

            render(<ProductList />);

            await waitFor(() => {
                expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
            });

            // 1.c) Verify mock call
            expect(productService.productService.getAll).toHaveBeenCalled();
        });

        // 1.b) Test failure scenario (Read all)
        it('should handle fetch error from mocked service', async () => {
            (productService.productService.getAll as any).mockRejectedValue(new Error('Fetch Error'));

            render(<ProductList />);

            await waitFor(() => {
                expect(screen.getByRole('alert')).toHaveTextContent('Fetch Error');
            });
        });

        // 1.a) Mock Delete operation
        it('should call delete mock when deleting product', async () => {
            const mockResponse = {
                products: [
                    { id: 1, name: 'Product To Delete', price: 100, quantity: 10, category: 'Test' }
                ]
            };
            (productService.productService.getAll as any).mockResolvedValue(mockResponse);
            (productService.productService.delete as any).mockResolvedValue({});
            
            vi.spyOn(window, 'confirm').mockImplementation(() => true);

            render(<ProductList />);

            await waitFor(() => {
                expect(screen.getByText('Product To Delete')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('Xóa'));

            await waitFor(() => {
                // 1.c) Verify delete mock call
                expect(productService.productService.delete).toHaveBeenCalledWith(1);
                // Verify re-fetch
                expect(productService.productService.getAll).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('ProductForm Component Mocking', () => {
        // 1.a) Mock Create operation
        it('should call create mock when submitting new product', async () => {
            const onSuccess = vi.fn();
            (productService.productService.create as any).mockResolvedValue({ id: 1, name: 'New' });

            render(<ProductForm onSuccess={onSuccess} />);

            fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'New Product' } });
            fireEvent.change(screen.getByLabelText('Giá'), { target: { value: '100' } });
            fireEvent.change(screen.getByLabelText('Số lượng'), { target: { value: '10' } });
            fireEvent.change(screen.getByLabelText('Danh mục'), { target: { value: 'Test' } });

            fireEvent.submit(screen.getByRole('form'));

            await waitFor(() => {
                // 1.c) Verify create mock call
                expect(productService.productService.create).toHaveBeenCalledWith(expect.objectContaining({
                    name: 'New Product'
                }));
            });
        });

        // 1.a) Mock Update operation
        it('should call update mock when submitting existing product', async () => {
            const onSuccess = vi.fn();
            const existingProduct = { id: 99, name: 'Old', price: 10, quantity: 1, category: 'Test' };
            (productService.productService.update as any).mockResolvedValue(existingProduct);

            render(<ProductForm product={existingProduct} onSuccess={onSuccess} />);

            fireEvent.submit(screen.getByRole('form'));

            await waitFor(() => {
                // 1.c) Verify update mock call
                expect(productService.productService.update).toHaveBeenCalledWith(99, expect.any(Object));
            });
        });

        // 1.b) Test failure scenario (Create)
        it('should display error when create fails', async () => {
            const onSuccess = vi.fn();
            (productService.productService.create as any).mockRejectedValue({ message: 'Create Failed' });

            render(<ProductForm onSuccess={onSuccess} />);

            fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'Fail Product' } });
            // Fill other required fields
            fireEvent.change(screen.getByLabelText('Giá'), { target: { value: '100' } });
            fireEvent.change(screen.getByLabelText('Số lượng'), { target: { value: '10' } });
            fireEvent.change(screen.getByLabelText('Danh mục'), { target: { value: 'Test' } });

            fireEvent.submit(screen.getByRole('form'));

            await waitFor(() => {
                expect(screen.getByRole('alert')).toHaveTextContent('Create Failed');
                expect(onSuccess).not.toHaveBeenCalled();
            });
        });
    });
});
