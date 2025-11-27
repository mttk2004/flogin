// True Integration Test for ProductForm
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductForm from '../components/ProductForm';

// No vi.mock() here! We are relying on the MSW server.

describe('ProductForm Integration Test', () => {
    it('should submit new product data to the correct API endpoint', async () => {
        const onSuccess = vi.fn(); // Mock the onSuccess callback
        render(<ProductForm onSuccess={onSuccess} />);

        // Fill the form
        fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'Integration Test Product' } });
        fireEvent.change(screen.getByLabelText('Giá'), { target: { value: '199' } });
        fireEvent.change(screen.getByLabelText('Số lượng'), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText('Danh mục'), { target: { value: 'Electronics' } });
        fireEvent.change(screen.getByLabelText('Mô tả'), { target: { value: 'A product from integration test' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));

        // The MSW handler for 'POST /api/products' will intercept this.
        // We just need to wait for the onSuccess callback to be called.
        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalled();
        });
    });
    
    it('should submit updated product data to the correct API endpoint', async () => {
        const onSuccess = vi.fn();
        const existingProduct = { id: 1, name: 'Old Name', price: 10, quantity: 1, category: 'Books', description: 'Old Desc' };
        
        render(<ProductForm product={existingProduct} onSuccess={onSuccess} />);

        // Check if form is pre-filled
        expect(screen.getByLabelText('Tên sản phẩm')).toHaveValue('Old Name');

        // Change a value
        fireEvent.change(screen.getByLabelText('Tên sản phẩm'), { target: { value: 'Updated Integration Product' } });
        
        // Submit
        fireEvent.click(screen.getByRole('button', { name: 'Lưu' }));

        // The MSW handler for 'PUT /api/products/:id' will intercept this.
        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalled();
        });
    });
});