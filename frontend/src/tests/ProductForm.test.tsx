import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductForm from '../components/ProductForm';
import * as productService from '../services/productService';

vi.mock('../services/productService', () => ({
    productService: {
        create: vi.fn(),
        update: vi.fn()
    }
}));

describe('ProductForm Component', () => {
    it('submits new product successfully', async () => {
        const onSuccess = vi.fn();
        (productService.productService.create as any).mockResolvedValue({});

        render(<ProductForm onSuccess={onSuccess} />);

        fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'New Product' } });
        fireEvent.change(screen.getByLabelText('Giá'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Số lượng'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Danh mục'), { target: { value: 'Electronics' } });

        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(productService.productService.create).toHaveBeenCalledWith(expect.objectContaining({
                name: 'New Product',
                price: 100,
                quantity: 10
            }));
            expect(onSuccess).toHaveBeenCalled();
        });
    });

    it('updates existing product successfully', async () => {
        const onSuccess = vi.fn();
        const product = { id: 1, name: 'Old', price: 10, quantity: 1, category: 'Test' };
        (productService.productService.update as any).mockResolvedValue({});

        render(<ProductForm product={product} onSuccess={onSuccess} />);

        fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'Updated' } });
        fireEvent.submit(screen.getByRole('form'));

        await waitFor(() => {
            expect(productService.productService.update).toHaveBeenCalledWith(1, expect.objectContaining({
                name: 'Updated'
            }));
        });
    });
});
