import React, { useState, useEffect } from 'react';
import type { Product } from '../services/productService';
import { productService } from '../services/productService';

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (product && product.id) {
        await productService.update(product.id, formData);
      } else {
        await productService.create(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi lưu sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="product-form">
      <h3>{product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h3>
      {error && <div role="alert">{error}</div>}

      <div>
        <label htmlFor="name">Tên sản phẩm</label>
        <input
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="price">Giá</label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          required
        />
      </div>

      <div>
        <label htmlFor="quantity">Số lượng</label>
        <input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Danh mục</label>
        <input
          id="category"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Lưu'}
      </button>
    </form>
  );
};

export default ProductForm;
