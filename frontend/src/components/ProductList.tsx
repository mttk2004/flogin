import React, { useEffect, useState } from 'react';
import type { Product } from '../services/productService';
import { productService } from '../services/productService';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for managing the form and success messages
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search and Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, categoryFilter]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Pass search and category to the service
      const data = await productService.getAll(0, 10, searchTerm, categoryFilter);
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
        loadProducts(); 
      } catch (err: any) {
        setError(err.message || 'Lỗi khi xóa sản phẩm');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSuccessMessage('Lưu sản phẩm thành công!');
    loadProducts();
  };

  if (loading && !products.length) return <div>Đang tải...</div>;
  // Allow showing list with error if needed, or just show error
  // if (error) return <div role="alert">{error}</div>;

  return (
    <div className="product-list">
      <h2>Danh sách sản phẩm</h2>
      
      {error && <div role="alert">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="controls" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handleAddNew} className="add-product-btn" data-testid="add-product-btn">Thêm sản phẩm</button>
        
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px' }}
        />

        <select 
          name="category" 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">Tất cả danh mục</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Toys">Toys</option>
        </select>
      </div>

      {showForm && (
        <div className="modal" style={{ 
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          background: 'white', padding: '20px', border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
        }}>
          <ProductForm product={editingProduct} onSuccess={handleSuccess} />
          <button onClick={() => setShowForm(false)} style={{ marginTop: '10px' }}>Đóng</button>
        </div>
      )}

      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            <tr key={product.id} data-testid="product-item">
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)} data-testid="edit-btn" style={{ marginRight: '5px' }}>
                  Sửa
                </button>
                <button onClick={() => product.id && handleDelete(product.id)} data-testid="delete-btn">
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