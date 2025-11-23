import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductList from '../components/ProductList';
import * as productService from '../services/productService';

vi.mock('../services/productService', () => ({
    productService: {
        getAll: vi.fn(),
        delete: vi.fn()
    }
}));

describe('ProductList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders product list correctly', async () => {
        const mockProducts = {
            products: [
                { id: 1, name: 'Product 1', price: 100, quantity: 10, category: 'Electronics' }
            ]
        };
        (productService.productService.getAll as any).mockResolvedValue(mockProducts);

        render(<ProductList />);

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });

    it('handles delete product', async () => {
        const mockProducts = {
            products: [
                { id: 1, name: 'Product 1', price: 100, quantity: 10, category: 'Electronics' }
            ]
        };
        (productService.productService.getAll as any).mockResolvedValue(mockProducts);
        (productService.productService.delete as any).mockResolvedValue({});
        
        // Mock window.confirm
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
