package com.flogin.service;

import com.flogin.model.Product;
import com.flogin.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Product Service
 * Business logic for Product management with validation
 * Implements CRUD operations and pagination as per câu 2.2 requirements
 */
@Service
public class ProductService {
  private final ProductRepository productRepository;

  // Valid product categories
  private static final List<String> VALID_CATEGORIES = Arrays.asList(
      "Electronics", "Clothing", "Food", "Books", "Toys", "Sports", "Home", "Beauty", "Other");
      
  // Validation constants from assignment.pdf
  private static final int MIN_NAME_LENGTH = 3;
  private static final int MAX_NAME_LENGTH = 100;
  private static final int MAX_DESCRIPTION_LENGTH = 500;
  private static final BigDecimal MAX_PRICE = new BigDecimal("999999999");
  private static final int MAX_QUANTITY = 99999;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Create a new product with validation
   */
  public Product createProduct(Product product) {
    validateProduct(product);
    product.setCreatedAt(LocalDateTime.now());
    product.setUpdatedAt(LocalDateTime.now());
    return productRepository.save(product);
  }

  /**
   * Get product by ID
   */
  public Optional<Product> getProduct(Long id) {
    if (id == null) {
      throw new IllegalArgumentException("ID không được null");
    }
    return productRepository.findById(id);
  }

  /**
   * Update existing product
   */
  public Product updateProduct(Long id, Product product) {
    if (id == null) {
      throw new IllegalArgumentException("ID không được null");
    }

    Optional<Product> existing = productRepository.findById(id);
    if (existing.isEmpty()) {
      throw new IllegalArgumentException("Không tìm thấy sản phẩm với ID: " + id);
    }

    validateProduct(product);
    product.setId(id);
    product.setCreatedAt(existing.get().getCreatedAt());
    product.setUpdatedAt(LocalDateTime.now());
    return productRepository.save(product);
  }

  /**
   * Delete product by ID
   */
  public void deleteProduct(Long id) {
    if (id == null) {
      throw new IllegalArgumentException("ID không được null");
    }

    if (!productRepository.existsById(id)) {
      throw new IllegalArgumentException("Không tìm thấy sản phẩm với ID: " + id);
    }

    productRepository.deleteById(id);
  }

  /**
   * Get all products with pagination
   */
  public List<Product> getAllProducts(int page, int size) {
    if (page < 0) {
      throw new IllegalArgumentException("Số trang không được âm");
    }
    if (size <= 0) {
      throw new IllegalArgumentException("Kích thước trang phải lớn hơn 0");
    }

    return productRepository.findAll(page, size);
  }

  /**
   * Get all products without pagination
   */
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  /**
   * Get total count of products
   */
  public long getTotalCount() {
    return productRepository.count();
  }

  /**
   * Validate product fields according to câu 2.2 requirements
   */
  private void validateProduct(Product product) {
    if (product == null) {
      throw new IllegalArgumentException("Sản phẩm không được null");
    }

    // Validate name
    validateName(product.getName());

    // Validate price
    validatePrice(product.getPrice());

    // Validate quantity
    validateQuantity(product.getQuantity());

    // Validate description (optional)
    validateDescription(product.getDescription());

    // Validate category
    validateCategory(product.getCategory());
  }

  private void validateName(String name) {
    if (name == null || name.trim().isEmpty()) {
      throw new IllegalArgumentException("Tên sản phẩm là bắt buộc");
    }
    if (name.trim().length() < MIN_NAME_LENGTH) {
        throw new IllegalArgumentException("Tên sản phẩm phải có ít nhất 3 ký tự");
    }
    if (name.trim().length() > MAX_NAME_LENGTH) {
      throw new IllegalArgumentException("Tên sản phẩm không được vượt quá 100 ký tự");
    }
  }

  private void validatePrice(BigDecimal price) {
    if (price == null) {
      throw new IllegalArgumentException("Giá sản phẩm là bắt buộc");
    }
    if (price.compareTo(BigDecimal.ZERO) <= 0) {
      throw new IllegalArgumentException("Giá sản phẩm phải lớn hơn 0");
    }
    if (price.compareTo(MAX_PRICE) > 0) {
      throw new IllegalArgumentException("Giá sản phẩm không được vượt quá 999,999,999");
    }
  }

  private void validateQuantity(Integer quantity) {
    if (quantity == null) {
      throw new IllegalArgumentException("Số lượng là bắt buộc");
    }
    if (quantity < 0) {
      throw new IllegalArgumentException("Số lượng không được âm");
    }
    if (quantity > MAX_QUANTITY) {
      throw new IllegalArgumentException("Số lượng không được vượt quá 99,999");
    }
  }

  private void validateDescription(String description) {
    if (description != null && description.length() > MAX_DESCRIPTION_LENGTH) {
      throw new IllegalArgumentException("Mô tả không được vượt quá 500 ký tự");
    }
  }

  private void validateCategory(String category) {
    if (category == null || category.trim().isEmpty()) {
      throw new IllegalArgumentException("Danh mục là bắt buộc");
    }
    if (!VALID_CATEGORIES.contains(category)) {
      throw new IllegalArgumentException("Danh mục không hợp lệ");
    }
  }
}
