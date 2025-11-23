import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductDetail from '../components/ProductDetail';
import * as productService from '../services/productService';

vi.mock('../services/productService', () => ({
    productService: {
        getById: vi.fn()
    }
}));

describe('ProductDetail Component', () => {
    it('renders product detail correctly', async () => {
        const mockProduct = { 
            id: 1, 
            name: 'Detail Product', 
            price: 500, 
            quantity: 5, 
            category: 'Test',
            description: 'Desc' 
        };
        (productService.productService.getById as any).mockResolvedValue(mockProduct);

        render(<ProductDetail productId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Detail Product')).toBeInTheDocument();
            expect(screen.getByText('Giá: 500')).toBeInTheDocument();
            expect(screen.getByText('Mô tả: Desc')).toBeInTheDocument();
        });
    });

    it('displays error when product not found', async () => {
        (productService.productService.getById as any).mockRejectedValue(new Error('Not Found'));

        render(<ProductDetail productId={999} />);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent('Not Found');
        });
    });
});
