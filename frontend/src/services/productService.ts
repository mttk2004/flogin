import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export interface Product {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    category: string;
}

export interface ProductListResponse {
    products: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export const productService = {
    getAll: async (page = 0, size = 10, search = '', category = ''): Promise<ProductListResponse> => {
        try {
            let url = `${API_URL}?page=${page}&size=${size}`;
            if (search) url += `&search=${encodeURIComponent(search)}`;
            if (category) url += `&category=${encodeURIComponent(category)}`;
            
            const response = await axios.get(url);
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Lỗi khi tải danh sách sản phẩm');
        }
    },

    getById: async (id: number): Promise<Product> => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Lỗi khi tải thông tin sản phẩm');
        }
    },

    create: async (product: Product): Promise<Product> => {
        try {
            const response = await axios.post(API_URL, product);
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Lỗi khi tạo sản phẩm');
        }
    },

    update: async (id: number, product: Product): Promise<Product> => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, product);
            return response.data.data;
        } catch (error: any) {
            throw error.response?.data || new Error('Lỗi khi cập nhật sản phẩm');
        }
    },

    delete: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error: any) {
            throw error.response?.data || new Error('Lỗi khi xóa sản phẩm');
        }
    }
};
