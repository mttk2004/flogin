package com.flogin.dto;

import com.flogin.model.Product;
import java.util.List;

public class ProductListResponse {
    private List<Product> products;
    private long totalItems;
    private int totalPages;
    private int currentPage;

    public ProductListResponse(List<Product> products, long totalItems, int page, int size) {
        this.products = products;
        this.totalItems = totalItems;
        this.currentPage = page;
        this.totalPages = size > 0 ? (int) Math.ceil((double) totalItems / size) : 0;
    }

    // Getters and Setters
    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(long totalItems) {
        this.totalItems = totalItems;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
