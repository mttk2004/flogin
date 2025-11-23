import React, { useEffect, useState } from 'react';
import { Product, productService } from '../services/productService';

interface ProductDetailProps {
    productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await productService.getById(productId);
                setProduct(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [productId]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div role="alert">{error}</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <p>Giá: {product.price}</p>
            <p>Số lượng: {product.quantity}</p>
            <p>Danh mục: {product.category}</p>
            <p>Mô tả: {product.description}</p>
        </div>
    );
};

export default ProductDetail;
