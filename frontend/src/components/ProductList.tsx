import React, { useEffect, useState } from 'react';
import type { Product } from '../services/productService';
import { productService } from '../services/productService';
import ProductForm from './ProductForm'; // Import ProductForm

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for managing the form and success messages
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data.products);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await productService.delete(id);
        setSuccessMessage('Xóa sản phẩm thành công!');
        loadProducts(); // Reload list
      } catch (err: any) {
        setError(err.message || 'Lỗi khi xóa sản phẩm');
      }
    }
  };

  const handleSuccess = () => {
    setShowForm(false); // Hide the form
    setSuccessMessage('Lưu sản phẩm thành công!');
    loadProducts(); // Reload the list
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      
      {/* Success Message Display */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Toggle Button for Form */}
      <button onClick={() => setShowForm(true)} className="add-product-btn">Thêm sản phẩm</button>

      {/* Conditional Rendering of ProductForm as a modal/inline form */}
      {showForm && (
        <div className="modal">
          <ProductForm onSuccess={handleSuccess} />
          <button onClick={() => setShowForm(false)}>Đóng</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => product.id && handleDelete(product.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
